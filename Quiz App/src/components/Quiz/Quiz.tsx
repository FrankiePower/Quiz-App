import React, { useRef, useState } from "react";
import { data } from "../../assets/data";
import "./Quiz.css";

export const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[0]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    ans: number
  ) => {
    if (lock === false) {
      if (question.ans === ans) {
        //@ts-ignore
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        //@ts-ignore
        e.target.classList.add("wrong");
        setLock(true);
        //@ts-ignore
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const previous = () => {
    if (index === 0) {
      return; // Prevent going to a negative index
    }
    setIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      setQuestion(data[newIndex]);
      return newIndex;
    });
    setLock(false);
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        //@ts-ignore!
        option.current.classList.remove("wrong");
        //@ts-ignore
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />

      {result ? (
        <>
          <div className="gif-container">
            <div className="hd2">
              <h1>
                You Scored {score} of {data.length}{" "}
              </h1>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              ref={Option1}
              onClick={(e) => {
                checkAns(e, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              ref={Option2}
              onClick={(e) => {
                checkAns(e, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              ref={Option3}
              onClick={(e) => {
                checkAns(e, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              ref={Option4}
              onClick={(e) => {
                checkAns(e, 4);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <div className="button-div">
            <button onClick={previous}>Previous</button>
            <button onClick={next}>Next</button>
          </div>
          <div className="index">
            {index + 1} of {data.length} Questions
          </div>
        </>
      )}
    </div>
  );
};
