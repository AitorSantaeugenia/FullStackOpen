import { useState } from "react";
import "./App.css";

//components
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick} className="btnAnecdotes">
    {text}
  </button>
);

const Anecdote = ({ text, votes }) => (
  <div>
    <p className="quote">"{text}"</p>
    <p>has {votes} votes</p>
  </div>
);

const Header = ({ header }) => (
  <div>
    <h2>{header}</h2>
  </div>
);

const MostVoted = ({ anecdotes, votes }) => {
  const largestNumVotes = Math.max(...votes);
  const mostVotedAnecdote = votes.indexOf(largestNumVotes);

  return (
    <>
      {largestNumVotes === 0 ? (
        <p>no votes yet</p>
      ) : (
        <Anecdote text={anecdotes[mostVotedAnecdote]} votes={largestNumVotes} />
      )}
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * (6 - 0 + 1) + 0));
  };

  const voteAnecdote = () => {
    const updateVotes = [...votes];
    updateVotes[selected] += 1;
    setVotes(updateVotes);
  };

  return (
    <>
      <Header header="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={voteAnecdote} text="vote" />
      <Button handleClick={randomAnecdote} text="next anecdote" />
      <Header header="Anecdote with most votes" />
      <MostVoted anecdotes={anecdotes} votes={votes} />
    </>
  );
};

export default App;
