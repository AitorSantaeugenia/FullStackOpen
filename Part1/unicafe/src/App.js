import React, { useState } from "react";
import "./App.css";

// button component
const Button = (props) => (
  <button onClick={props.handleClick} className="btnUnicafe">
    {props.text}
  </button>
);

// statisticLine component
const StatisticLine = ({ text, value }) => {
  //having fun here with ternary, just for fun
  return (
    <>
      {text === "positive" ? (
        <tr>
          <td>{text}</td>
          <td>{value} %</td>
        </tr>
      ) : text === "good" ? (
        <tr>
          <td>{text}</td>
          <td className="spanGreen">{value}</td>
        </tr>
      ) : text === "bad" ? (
        <tr>
          <td>{text}</td>
          <td className="spanRed">{value}</td>
        </tr>
      ) : text === "average" && value > 0 ? (
        <tr>
          <td>{text}</td>
          <td className="spanGreen">{value}</td>
        </tr>
      ) : text === "average" && value < 0 ? (
        <tr>
          <td>{text}</td>
          <td className="spanRed">{value}</td>
        </tr>
      ) : (
        <tr>
          <td>{text}</td>
          <td>{value} </td>
        </tr>
      )}
    </>
  );
};

// statistics component
const Statistics = ({ good, neutral, bad }) => {
  let sum = good + neutral + bad;
  let average = (good - bad) / sum;
  let positive = (good / sum) * 100;

  if (sum === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <div>No feedback given</div>
      </div>
    );
  }

  return (
    <div>
      <h2>statistics</h2>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={sum} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = (good) => setGood(good);
  const setToNeutral = (neutral) => setNeutral(neutral);
  const setToBad = (bad) => setBad(bad);

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
