import React from 'react';
import { connect } from 'react-redux';
import { addNewNote } from '../reducers/anecdoteReducer';
import { setNotification } from "../reducers/notificationReducer";
import {withRouter} from "react-router-dom";

const NewNoteAdd = ({ addNewNote, setNotification, history }) => {
  const handleSubmit = event => {
    event.preventDefault();

    const noteText = event.target.note.value;
    event.target.note.value = '';

    addNewNote(noteText).then((newNote) => {
      history.push('/');
      setNotification(`"${newNote}" was created`, 8000);
    });
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="note" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};
 
const NewNoteState = connect(null, { addNewNote, setNotification })(NewNoteAdd);
const NewNote = withRouter(NewNoteState);
export default NewNote;