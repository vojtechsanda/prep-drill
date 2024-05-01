import { useNavigate } from "react-router-dom";

import { useSessionInfo } from "@/hooks/session";
import { useSavedQuestionsQuery } from "@/hooks/storage/questions";
import { useSaveSessionMutation } from "@/hooks/storage/session";
import { shuffle } from "@/lib/utils";
import { Session, SessionConfigSchema, sessionSchema } from "@/schemas";

export const useHandleSubmit = () => {
  const navigate = useNavigate();

  const questionsQuery = useSavedQuestionsQuery();

  const sessionInfo = useSessionInfo();
  const mistakesIds =
    sessionInfo?.session.questionsIds.filter(
      (id) =>
        sessionInfo.session.incorrectQuestionsIds.includes(id) ||
        sessionInfo.session.partiallyCorrectQuestionsIds.includes(id),
    ) ?? [];

  const { mutateAsync: saveSession } = useSaveSessionMutation();

  return async (config: SessionConfigSchema) => {
    // Create session
    const session: Partial<Session> = {
      status: "IN_PROGRESS",
      config,
      correctQuestionsIds: [],
      partiallyCorrectQuestionsIds: [],
      incorrectQuestionsIds: [],
    };

    const questionsIds = config.practiceOnlyMistakes
      ? mistakesIds
      : questionsQuery.data?.map((question) => question.id) ?? [];

    if (!questionsIds?.length) {
      throw new Error("No questions found");
    }

    const shuffledQuestionsIds = config.shuffleQuestions
      ? shuffle(questionsIds)
      : questionsIds;

    session.questionsIds = shuffledQuestionsIds;
    session.currentQuestionId = session.questionsIds[0];

    const parsedSession = await sessionSchema.parseAsync(session);

    // Save session
    await saveSession(parsedSession);

    // Start session
    navigate(`/session`);
  };
};
