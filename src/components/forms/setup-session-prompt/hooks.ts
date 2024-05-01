import { useNavigate } from "react-router-dom";

import { useSavedQuestionsQuery } from "@/hooks/storage/questions";
import { useSaveSessionMutation } from "@/hooks/storage/session";
import { shuffle } from "@/lib/utils";
import { Session, SessionConfigSchema, sessionSchema } from "@/schemas";

export const useHandleSubmit = () => {
  const navigate = useNavigate();

  const questionsQuery = useSavedQuestionsQuery();
  // TODO: Add questionsWithMistakesQuery
  const questionsWithMistakesQuery = useSavedQuestionsQuery();

  const { mutateAsync: saveSession } = useSaveSessionMutation();

  return async (config: SessionConfigSchema) => {
    // Create session
    const session: Partial<Session> = {
      status: "IN_PROGRESS",
      config,
      correctQuestionsIds: [],
      incorrectQuestionsIds: [],
    };

    const questions = config.practiceOnlyMistakes
      ? questionsWithMistakesQuery.data
      : questionsQuery.data;

    if (!questions?.length) {
      throw new Error("No questions found");
    }

    const shuffledQuestions = config.shuffleQuestions
      ? shuffle(questions)
      : questions;

    session.questionsIds = shuffledQuestions.map((question) => question.id);
    session.currentQuestion = session.questionsIds[0];

    const parsedSession = await sessionSchema.parseAsync(session);

    // Save session
    await saveSession(parsedSession);

    // Start session
    navigate(`/session`);
  };
};
