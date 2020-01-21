import React, {useState } from 'react';
import Note from './components/Note';

function NoteApp(props) {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("a new note..");
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);

  const NotesList = notesToShow.map(note => (
    <Note key={note.id} content={note.content} />
  ));

  const addNote = event => {
    event.preventDefault();

    const newNoteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    };

    setNotes(notes.concat(newNoteObject));
    setNewNote("");
  };

  const handleNewNote = event => {
    setNewNote(event.target.value);
  };

  return (
    <div className="App">
      <ul>{NotesList}</ul>

      <button
        onClick={() => {
          setShowAll(!showAll);
        }}
      >
        show {showAll ? "important" : "all"}
      </button>

      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNewNote} />
        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default NoteApp;
