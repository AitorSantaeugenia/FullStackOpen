import React, { useState } from "react";
import "./App.css";

const Button = (props) => (
  <button onClick={props.handleClick} className="btnUnicafe">
    {props.text}
  </button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let sum = 0;

  const setToGood = (good) => setGood(good);
  const setToNeutral = (neutral) => setNeutral(neutral);
  const setToBad = (bad) => setBad(bad);
  sum = good + neutral + bad;

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <h2>statistics</h2>
      <span>good {good}</span>
      <br></br>
      <span>neutral {neutral}</span>
      <br></br>
      <span>bad {bad}</span>
      <br></br>
      <span>all {sum ? sum : 0}</span>
      <br></br>
      <span>average {good ? (good - bad) / sum : 0}</span>
      <br></br>
      <span>positive {good ? (good / sum) * 100 + " %" : 0}</span>
    </div>
  );
};

export default App;
