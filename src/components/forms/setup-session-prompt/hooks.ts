import { useNavigate } from "react-router-dom";
import { uid } from "uid";

import { useInitHistory } from "@/hooks/history";
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

  const initHistory = useInitHistory();

  return async (config: SessionConfigSchema) => {
    // Create session
    const session: Partial<Session> = {
      id: uid(),
      createdAt: new Date().toISOString(),
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

    // Save history entry
    initHistory({
      id: parsedSession.id,
      config: parsedSession.config,
      createdAt: parsedSession.createdAt,
      responses: [],
      totalQuestions: parsedSession.questionsIds.length,
    });

    // Start session
    navigate(`/session`);
  };
};
