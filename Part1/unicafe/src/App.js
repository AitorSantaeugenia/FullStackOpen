import React, { useState } from "react";
import "./App.css";

const Button = (props) => (
  <button onClick={props.handleClick} className="btnUnicafe">
    {props.text}
  </button>
);

// a proper place to define a component
const Statistics = ({ good, neutral, bad }) => {
  let sum = good + neutral + bad;
  let average = (good - bad) / sum;
  let positive = (good / sum) * 100;

  return (
    <div>
      <h2>statistics</h2>
      <span>good {good}</span>
      <br></br>
      <span>neutral {neutral}</span>
      <br></br>
      <span>bad {bad}</span>
      <br></br>
      <span>all {sum ? sum : 0}</span>
      <br></br>
      <span className={average > 0 ? "spanGreen" : "spanRed"}>
        average {average ? average : 0}
      </span>
      <br></br>
      <span>positive {positive ? positive + " %" : 0}</span>
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
