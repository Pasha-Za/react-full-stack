import React from 'react';
import {setNotification} from '../reducers/notificationReducer';
import { updateVote } from "../reducers/anecdoteReducer";
import { connect } from 'react-redux';
import Note from './Note';


const NotesList = ({ setNotification, updateVote, anecdotesToShow }) => {

  const handleVote = (id, msg) => {
    updateVote(id);
    setNotification(`"${msg}" was voted`, 3000);
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotesToShow.map(anecdote => (
        <Note key={anecdote.id} anecdote={anecdote} handleVote={handleVote} />
      ))}
    </>
  );
};

const anecdotesToShow = (anecdotes, filter) => {
  return filter ? anecdotes.filter(anecdote =>
      anecdote.content.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    )
  : anecdotes;
}
 
const mapStateToProps = ({anecdotes, filter}) => {
  return {
    anecdotes,
    filter,
    anecdotesToShow: anecdotesToShow(anecdotes, filter)
  };
}
export default connect(mapStateToProps, { setNotification, updateVote })(
  NotesList
);