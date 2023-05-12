import { useState } from "react";
import { QuestionCard } from "./components/QuestionCard";
import { Difficulty, QuestionState, fetchQuizQuestions } from "./API";
import { GlobalStyle, Wrapper } from "./App.style";

const TOTAL_QUESTIONS = 10;

export interface AnswerObject {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

export function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  console.log(
    fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY).then((res) =>
      console.log("res", res)
    )
  );

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    try {
      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );
      console.log("newQuestions", newQuestions);
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev) => prev + 1);

      const answerObject: AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    console.log("Next question");
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true); // end of game
    } else {
      setNumber(nextQuestion); // move to next question
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}

        {!gameOver && <p className="score">Score: {score}</p>}
        {!loading && !gameOver && (
          <QuestionCard
            question={questions[number].question}
            questionNr={number + 1}
            totalQuestions={10}
            callback={checkAnswer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            answers={questions[number].answers}
          />
        )}

        {/* This is conditionally rendering a "Next Question" button based on the
      following conditions:
      - The game is not over (`!gameOver`)
      - The questions are not currently loading (`!loading`)
      - The user has answered the current question (`userAnswers.length ===
      number + 1`)
      - The current question is not the last question (`number !==
      TOTAL_QUESTIONS - 1`) */}

        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
}
