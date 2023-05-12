/* This code is defining an interface called `Question` which describes the
structure of a quiz question. It has properties such as `category`,
`correct_answer`, `difficulty`, `incorrect_answers`, `question`, and `type`,
each with a specific data type. This interface is used to ensure that any object
representing a quiz question follows this structure and has all the required
properties. */

import { shuffleArray } from "./utils";

export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

/* `export interface QuestionState` is defining a new interface that extends the
`Question` interface. It adds a new property called `answers` which is an array
of strings representing the possible answers to the quiz question, including the
correct answer. This interface is used to represent the state of a quiz question
in the application, where the user can select an answer from the list of
possible answers. By extending the `Question` interface, it ensures that the
`QuestionState` interface has all the required properties of a quiz question. */

export interface QuestionState extends Question {
  answers: string[];
}

/* `export enum Difficulty` is defining a custom type called `Difficulty` that
represents the difficulty level of quiz questions. It has three possible values:
`EASY`, `MEDIUM`, and `HARD`, each with a corresponding string value of
`"easy"`, `"medium"`, and `"hard"`. This enum is exported so that it can be used
in other parts of the codebase. */

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

/**
 * This function fetches quiz questions from an API based on the specified amount
 * and difficulty, and returns them with the correct answer included in the answer
 * choices.
 * @param {number} amount - The number of questions to fetch from the API.
 * @param {Difficulty} difficulty - Difficulty is a custom type that represents the
 * difficulty level of the quiz questions. It can have three possible values:
 * "easy", "medium", or "hard". This parameter is used to filter the quiz questions
 * based on their difficulty level.
 * @returns The function `fetchQuizQuestions` is returning an array of objects,
 * where each object represents a quiz question. Each question object contains the
 * question itself, an array of possible answers (including the correct answer),
 * and some other metadata such as the category and difficulty level of the
 * question. The number of questions and difficulty level are specified as input
 * parameters to the function. The data is fetched from an external API
 */
export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
