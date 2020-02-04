import React from 'react';
import { connect } from 'react-redux';
import { addNewNote } from '../reducers/anecdoteReducer';
import { setNotification } from "../reducers/notificationReducer";

const NewNote = ({ addNewNote, setNotification }) => {
  const handleSubmit = event => {
    event.preventDefault();

    const noteText = event.target.note.value;
    event.target.note.value = '';

    addNewNote(noteText).then((newNote) => {
      setNotification(`"${newNote}" was created`, 3000);
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
 
export default connect(null, { addNewNote, setNotification })(NewNote);