import { useSaveSessionMutation } from "@/hooks/storage/session";
import { Answer, Question } from "@/schemas";

import { SessionInfo } from "../../hooks";
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

type HandleSubmitProps = {
  sessionInfo: SessionInfo;
  answersResult: Record<string, boolean | null>;
};

export function useHandleSubmit() {
  const { mutateAsync: saveSession } = useSaveSessionMutation();

  return async ({ sessionInfo, answersResult }: HandleSubmitProps) => {
    const question = sessionInfo.currentQuestion;
    if (!question) return;

    const someNotChecked = Object.values(answersResult).some(
      (val) => val === null,
    );
    const someIncorrect = Object.values(answersResult).some(
      (val) => val === false,
    );
    const someCorrect = Object.values(answersResult).some(
      (val) => val === true,
    );

    const updatedSession = { ...sessionInfo.session };
    if (someIncorrect || (someNotChecked && !someCorrect)) {
      updatedSession.incorrectQuestionsIds.push(question.id);
    } else if (someNotChecked) {
      updatedSession.partiallyCorrectQuestionsIds.push(question.id);
    } else {
      updatedSession.correctQuestionsIds.push(question.id);
    }

    // Update stats
    await saveSession(updatedSession);

    // Update current question, but invalidate it later (refresh, clicking next question button)
    const currentQuestionIndex = updatedSession.questionsIds.indexOf(
      question.id,
    );
    updatedSession.currentQuestionId =
      updatedSession.questionsIds[currentQuestionIndex + 1];

    await saveSession({ session: updatedSession, invalidate: false });
  };
}
