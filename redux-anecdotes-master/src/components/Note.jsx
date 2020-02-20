import React from 'react';
import { Link } from 'react-router-dom';


const Note = ({ anecdote, handleVote }) => {
  if (!anecdote) {
    return <h2>Loading...</h2>
  }
  return (
    <div key={anecdote.id}>
      <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      <div>
        has {anecdote.votes} votes
        {handleVote ? (
          <button onClick={() => handleVote(anecdote.id, anecdote.content)}>
            vote
          </button>
        ) : null}
      </div>
    </div>
  );
};
 
export default Note;