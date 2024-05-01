import { useSessionInfo } from "@/hooks/session";
import { useSaveSessionMutation } from "@/hooks/storage/session";
import { Answer, Question } from "@/schemas";

import { QuestionCardAnswers } from "./schema";

export function useDefaultValues(answers: Answer[]): QuestionCardAnswers {
  return {
    answers: answers.map((answer) => ({
      id: answer.id,
      checked: false,
    })),
  };
}

/**
 * Hook for processing answers
 *
 * `false` -> Incorrect answer checked
 *
 * `true` -> Correct answer checked
 *
 * `null` -> Correct answer not checked
 */
export function useProcessAnswers(question: Question) {
  return (data: QuestionCardAnswers) => {
    const checkedAnswers = {} as Record<string, boolean | null>;

    data.answers.forEach((answer) => {
      const shouldBeChecked = !!question.answers.find(
        (_answer) => answer.id === _answer.id,
      )?.isCorrect;

      if (shouldBeChecked) {
        if (answer.checked) {
          checkedAnswers[answer.id] = true;
        } else {
          checkedAnswers[answer.id] = null;
        }
      } else if (answer.checked) {
        checkedAnswers[answer.id] = false;
      }
    });

    return checkedAnswers;
  };
}

export function useSaveAnswers() {
  const sessionInfo = useSessionInfo();
  const { mutateAsync: saveSession } = useSaveSessionMutation();

  return async (answersResult: Record<string, boolean | null>) => {
    if (!sessionInfo) {
      throw new Error("Session info is not available");
    }

    const question = sessionInfo.currentQuestion;
    if (!question) {
      throw new Error("Question is not available");
    }

    const someNotChecked = Object.values(answersResult).some(
      (val) => val === null,
    );
    const someIncorrect = Object.values(answersResult).some(
      (val) => val === false,
    );
    const someCorrect = Object.values(answersResult).some(
      (val) => val === true,
    );

    // Update stats
    const updatedSession = { ...sessionInfo.session };
    if (someIncorrect || (someNotChecked && !someCorrect)) {
      updatedSession.incorrectQuestionsIds.push(question.id);
    } else if (someNotChecked) {
      updatedSession.partiallyCorrectQuestionsIds.push(question.id);
    } else {
      updatedSession.correctQuestionsIds.push(question.id);
    }

    await saveSession(updatedSession);

    // Update current question, it will be invalidated later (refresh, clicking the next question button)
    const currentQuestionIndex = updatedSession.questionsIds.indexOf(
      question.id,
    );
    updatedSession.currentQuestionId =
      updatedSession.questionsIds[currentQuestionIndex + 1];

    if (updatedSession.currentQuestionId === undefined) {
      updatedSession.status = "FINISHED";
    }

    await saveSession({ session: updatedSession, invalidate: false });
  };
}
