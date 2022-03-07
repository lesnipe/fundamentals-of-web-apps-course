import { useState } from "react";

const Anecdote = ({title, text1, text2, onClick}) => {
  return(
    <div>
      <h1>{title}</h1>
      <p>{text1}</p>
      <p>{text2}</p>
      {onClick!="no" && <button onClick={onClick}>Next anecdote</button>}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];
  const [selected, setSelected] = useState(0);
  const [maxVotesIndex, setMaxVotesIndex] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const handleClick = () => {
    let rand = Math.floor(Math.random() * anecdotes.length);
    const copyVotes = { ...votes };
    copyVotes[rand] += 1;

    setSelected(rand);
    setVotes(copyVotes);

    for (let key in copyVotes)
      if (copyVotes[key] > copyVotes[maxVotesIndex]) setMaxVotesIndex(key);
  };

  return (
    <div>
       <Anecdote
        title="Anecdote of the day"
        onClick={handleClick}
        text1={anecdotes[selected]}
        text2={"has " + votes[selected] + " votes"}
      />
      <Anecdote title="Anecdote with most views" 
      onClick="no"
      text1={anecdotes[maxVotesIndex]}
      text2={"has " + votes[maxVotesIndex] + " votes"}
      /> 
    </div>
  );
};

export default App;
