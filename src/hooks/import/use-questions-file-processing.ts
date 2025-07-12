import { uid } from "uid";

import { Answer, Question, Questions, useQuestionsSchema } from "@/schemas";

import { useFileLoading } from "./use-file-loading";

/**
 * Expected format for questions in file is as follows (each question must have a trailing newline):
 *```txt
 * title
 * >>> Correct answer 1
 * Incorrect answer
 * >>> Correct answer 2
 *
 * ```
 * eg.
 * ```txt
 * 1. What is the capital of France?
 * >>>A) Paris
 * B) London
 *
 *
 * ```
 */
export function useQuestionsFileProcessing() {
  const loadFile = useFileLoading();
  const questionsSchema = useQuestionsSchema();

  return async function processFile(file: File): Promise<Questions> {
    const content = await loadFile(file);

    const sanitizedQuestionBlocks = content
      .split("\n")
      .map((line) => line.trim())
      .join("\n")
      .split("\n\n")
      .map((block) => block.trim())
      .filter(Boolean);

    const processedQuestions = sanitizedQuestionBlocks.map((questionBlock) => {
      const [title, ...answers] = questionBlock.split("\n");

      const processedAnswers = answers.map((answerLine) => {
        const isCorrect = answerLine.startsWith(">>>");
        const text = isCorrect ? answerLine.slice(3).trim() : answerLine;

        return {
          id: uid(),
          text,
          isCorrect,
        } satisfies Answer;
      });

      return {
        id: uid(),
        title,
        answers: processedAnswers,
        isMarked: false,
      } satisfies Question;
    });

    return questionsSchema.parse(processedQuestions);
  };
}
