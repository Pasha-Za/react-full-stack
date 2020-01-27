import React from 'react';

const NoteForm = ({ newNote, handleNewNote, addNote}) => {
    return (
        <form onSubmit={addNote}>
            <input type="text" value={newNote} onChange={handleNewNote} />
            <button type="submit">add</button>
        </form>
    );
}
 
export default NoteForm;