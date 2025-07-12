import { useIntl } from "react-intl";

import { Questions } from "@/schemas";

export function useDemoQuestions() {
  const intl = useIntl();

  return [
    {
      id: "question-1",
      title: intl.formatMessage({
        id: "demo.questions.question-1.title",
        defaultMessage: "Which of the following cities are capital cities?",
      }),
      isMarked: false,
      answers: [
        {
          id: "answer-1",
          text: intl.formatMessage({
            id: "demo.questions.question-1.answer-1",
            defaultMessage: "Prague",
          }),
          isCorrect: true,
        },
        {
          id: "answer-2",
          text: intl.formatMessage({
            id: "demo.questions.question-1.answer-2",
            defaultMessage: "Berlin",
          }),
          isCorrect: true,
        },
        {
          id: "answer-3",
          text: intl.formatMessage({
            id: "demo.questions.question-1.answer-3",
            defaultMessage: "Brno",
          }),
          isCorrect: false,
        },
        {
          id: "answer-4",
          text: intl.formatMessage({
            id: "demo.questions.question-1.answer-4",
            defaultMessage: "Munich",
          }),
          isCorrect: false,
        },
      ],
    },
    {
      id: "question-2",
      title: intl.formatMessage({
        id: "demo.questions.question-2.title",
        defaultMessage:
          "Which of these elements are gases at standard temperature and pressure?",
      }),
      isMarked: false,
      answers: [
        {
          id: "answer-1",
          text: intl.formatMessage({
            id: "demo.questions.question-2.answer-1",
            defaultMessage: "Oxygen",
          }),
          isCorrect: true,
        },
        {
          id: "answer-2",
          text: intl.formatMessage({
            id: "demo.questions.question-2.answer-2",
            defaultMessage: "Nitrogen",
          }),
          isCorrect: true,
        },
        {
          id: "answer-3",
          text: intl.formatMessage({
            id: "demo.questions.question-2.answer-3",
            defaultMessage: "Iron",
          }),
          isCorrect: false,
        },
        {
          id: "answer-4",
          text: intl.formatMessage({
            id: "demo.questions.question-2.answer-4",
            defaultMessage: "Carbon",
          }),
          isCorrect: false,
        },
      ],
    },
    {
      id: "question-3",
      title: intl.formatMessage({
        id: "demo.questions.question-3.title",
        defaultMessage: "Which books were written by Karel Čapek?",
      }),
      isMarked: false,
      answers: [
        {
          id: "answer-1",
          text: intl.formatMessage({
            id: "demo.questions.question-3.answer-1",
            defaultMessage: "War with the Newts",
          }),
          isCorrect: true,
        },
        {
          id: "answer-2",
          text: intl.formatMessage({
            id: "demo.questions.question-3.answer-2",
            defaultMessage: "R.U.R.",
          }),
          isCorrect: true,
        },
        {
          id: "answer-3",
          text: intl.formatMessage({
            id: "demo.questions.question-3.answer-3",
            defaultMessage: "The Grandmother",
          }),
          isCorrect: false,
        },
        {
          id: "answer-4",
          text: intl.formatMessage({
            id: "demo.questions.question-3.answer-4",
            defaultMessage: "Saturnin",
          }),
          isCorrect: false,
        },
      ],
    },
    {
      id: "question-4",
      title: intl.formatMessage({
        id: "demo.questions.question-4.title",
        defaultMessage: "What is 9 × 6?",
      }),
      isMarked: false,
      answers: [
        {
          id: "answer-1",
          text: "54",
          isCorrect: true,
        },
        {
          id: "answer-2",
          text: "45",
          isCorrect: false,
        },
        {
          id: "answer-3",
          text: "63",
          isCorrect: false,
        },
        {
          id: "answer-4",
          text: "56",
          isCorrect: false,
        },
      ],
    },
    {
      id: "question-5",
      title: intl.formatMessage({
        id: "demo.questions.question-5.title",
        defaultMessage:
          "Which of the following are planets in our solar system?",
      }),
      isMarked: false,
      answers: [
        {
          id: "answer-1",
          text: intl.formatMessage({
            id: "demo.questions.question-5.answer-1",
            defaultMessage: "Mars",
          }),
          isCorrect: true,
        },
        {
          id: "answer-2",
          text: intl.formatMessage({
            id: "demo.questions.question-5.answer-2",
            defaultMessage: "Jupiter",
          }),
          isCorrect: true,
        },
        {
          id: "answer-3",
          text: intl.formatMessage({
            id: "demo.questions.question-5.answer-3",
            defaultMessage: "Pluto",
          }),
          isCorrect: false,
        },
        {
          id: "answer-4",
          text: intl.formatMessage({
            id: "demo.questions.question-5.answer-4",
            defaultMessage: "Moon",
          }),
          isCorrect: false,
        },
      ],
    },
  ] satisfies Questions;
}
