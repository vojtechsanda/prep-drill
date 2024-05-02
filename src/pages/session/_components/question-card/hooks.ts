import { useMemo } from "react";
import { useIntl } from "react-intl";

import { useToast } from "@/components/ui/use-toast";
import { useSessionInfo } from "@/hooks/session";
import { useSaveHistoryAnswer } from "@/hooks/storage/history";
import { useSaveSessionMutation } from "@/hooks/storage/session";
import { Answer, Question } from "@/schemas";

import { QuestionCardAnswers } from "./schema";

export function useDefaultValues(answers: Answer[]): QuestionCardAnswers {
  return useMemo(() => {
    return {
      answers: answers.map((answer) => ({
        id: answer.id,
        checked: false,
      })),
    };
  }, [answers]);
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
  };
}

export function useHandleSubmit(question: Question) {
  const { toast } = useToast();
  const intl = useIntl();

  const processAnswers = useProcessAnswers(question);
  const saveAnswers = useSaveAnswers();

  const sessionInfo = useSessionInfo();
  const saveAnswerToHistory = useSaveHistoryAnswer();

  return async (data: QuestionCardAnswers) => {
    if (!sessionInfo) return;

    const processedAnswers = processAnswers(data);

    try {
      await saveAnswers(processedAnswers);
    } catch (error) {
      console.error(error);

      toast({
        title: intl.formatMessage({
          id: "question-card.error.saveAnswers",
          defaultMessage: "Failed to save answers",
        }),
        variant: "destructive",
      });
    }

    // TODO: hook pro tohle si taky může udělat sessionInfo ne?
    saveAnswerToHistory({
      sessionId: sessionInfo.session.id,
      answer: {
        questionId: question.id,
        answers: processedAnswers,
      },
    });
  };
}
