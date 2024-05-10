import { useNavigate } from "react-router-dom";
import { uid } from "uid";

import { useInitHistory } from "@/hooks/history";
import { useSessionInfo } from "@/hooks/session";
import { useSavedQuestionsQuery } from "@/hooks/storage/questions";
import { useSaveSessionMutation } from "@/hooks/storage/session";
import { shuffle } from "@/lib/utils";
import {
  Questions,
  Session,
  SessionConfigSchema,
  sessionSchema,
} from "@/schemas";

export const useHandleSubmit = () => {
  const navigate = useNavigate();

  const questionsQuery = useSavedQuestionsQuery();

  const filterQuestions = useFilterQuestions(questionsQuery.data ?? []);

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

    const questionsIds = filterQuestions(config);

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

function useFilterQuestions(questions: Questions) {
  const sessionInfo = useSessionInfo();

  const questionIds = questions.map((question) => question.id);

  const markedIds = questions
    .filter((question) => question.isMarked)
    .map((question) => question.id);

  const mistakeIds =
    sessionInfo?.session.questionsIds.filter(
      (id) =>
        sessionInfo.session.incorrectQuestionsIds.includes(id) ||
        sessionInfo.session.partiallyCorrectQuestionsIds.includes(id),
    ) ?? [];

  return (config: SessionConfigSchema) => {
    if (config.practiceOnlyMarked && config.practiceOnlyMistakes) {
      return markedIds.filter((id) => mistakeIds.includes(id));
    }

    if (config.practiceOnlyMarked) return markedIds;
    if (config.practiceOnlyMistakes) return mistakeIds;

    return questionIds;
  };
}
