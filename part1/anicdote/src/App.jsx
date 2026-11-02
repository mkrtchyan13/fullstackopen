import { useState } from "react";

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];

const randomIndex = () => Math.floor(Math.random() * anecdotes.length);

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <div>{text}</div>
      <div>
        has {votes} {votes === 1 ? "vote" : "votes"}
      </div>
    </div>
  );
};

const App = () => {
  const [selected, setSelected] = useState(randomIndex());
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleVotes = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const max = Math.max(...votes);
  const maxIndexOf = votes.indexOf(max);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={handleVotes}>Vote</button>
      <button onClick={() => setSelected(randomIndex())}>Next Anecdote</button>
      <h1>Anecdote with the maximum vote is</h1>
      {max > 0 ? (
        <Anecdote text={anecdotes[maxIndexOf]} votes={max} />
      ) : (
        <div>No votes yet</div>
      )}
    </div>
  );
};

export default App;
