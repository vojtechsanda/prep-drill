import { uid } from "uid";

import { Answer, Question, Questions, useQuestionsSchema } from "@/schemas";

import { useFileLoading } from "./use-file-loading";

/**
 * Expected format for questions in file is as follows (each question must have a trailing newline):
 *```txt
 * {uniq_question_id}. {question}
 * >>>{uniq_question_answer_id}) Correct answer 1
 * {uniq_question_answer_id}) Incorrect answer
 * >>>{uniq_question_answer_id}) Correct answer 2
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

  // TODO: Add better error handling (one bad question should not break the whole import process - just skip it and show a warning)
  return async function processFile(file: File): Promise<Questions> {
    const questions: Partial<Question>[] = [];

    const content = await loadFile(file);

    // TODO: Some RegExp processing magic here would be nicer
    let nextLineIsTitle = true;
    let currentQuestion: Partial<Question> = {};

    content.split("\n").forEach((lineRaw) => {
      const line = lineRaw.trim();

      // Title processing
      if (nextLineIsTitle) {
        nextLineIsTitle = false;

        const [, ...question] = line.split(". ");
        currentQuestion.id = uid();
        currentQuestion.title = question.join(". ");
        currentQuestion.isMarked = false;
        return;
      }

      // Empty line (newline) -> save question and create a new one
      if (line === "") {
        questions.push(currentQuestion);

        currentQuestion = {};
        nextLineIsTitle = true;
        return;
      }

      // Answer processing
      const [prefix, ...answerText] = line.split(") ");
      const [, idIfCorrect] = prefix.split(">>>");
      const isCorrect = !!idIfCorrect;

      const answer: Answer = {
        id: uid(),
        text: answerText.join(") "),
        isCorrect: isCorrect || undefined,
      };

      if (!currentQuestion.answers) currentQuestion.answers = [];
      currentQuestion.answers.push(answer);
    });

    return questionsSchema.parse(questions);
  };
}
