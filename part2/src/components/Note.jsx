import React from 'react';

const Note = ({note, toggleImportance}) => {
    const importantTxt = note.important ? 'remove inportant' : 'add important';
    return (
      <li>
        {note.content}{" "}
        <button onClick={toggleImportance}>{importantTxt}</button>
      </li>
    );
}
 
export default Note;