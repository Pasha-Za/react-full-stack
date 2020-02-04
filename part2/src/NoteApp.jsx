import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import Button from './components/shared/Button'
import Notification from './components/shared/Notification'
import NotesService from "./services/note";
import LoginService from "./services/login";
import LoginForm from './components/LoginForm';
import Togglable from './components/shared/Togglable';
import NoteForm from './components/NoteForm';

function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note..");
  const [showAll, setShowAll] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    console.log("effect");

    NotesService.getAll().then(initialData => {
        console.log("Fulfilled");
        setNotes(initialData);
      });
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedNoteAppUser");

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      NotesService.setToken(user.token);
    }
  }, [])

  console.log('render', notes.length, 'notes');

  const toggleImportanceOf = id => () => {
    const noteToUpdate = notes.find(note => note.id === id);

    NotesService.update(id, {
      ...noteToUpdate,
      important: !noteToUpdate.important
    }).then(recievedNote => {
      setNotes(notes.map(note => (note.id !== id ? note : recievedNote)));
    });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);

  const NotesList = notesToShow.map(note => (
    <Note
      key={note.id}
      note={note}
      toggleImportance={toggleImportanceOf(note.id)}
    />
  ));

  const noteFormRef = React.createRef()

  const addNote = event => {
    event.preventDefault();
    noteFormRef.current.toggleVisibility();

    const newNoteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    };

    NotesService.create(newNoteObject).then(recievedNote => {
      setNotes(notes.concat(recievedNote));
      setNewNote("");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    });
  };

  const handleNewNote = event => {
    setNewNote(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
          //need API
          // const userLogged = await LoginService.login( {username, password });
          const userLogged = { token: "1", name: username };

          window.localStorage.setItem(
            "loggedNoteAppUser",
            JSON.stringify(userLogged)
          );
          NotesService.setToken(userLogged.token);
          setUser(userLogged);
          setUsername("");
          setPassword("");
        } catch (error) {
      console.log("wrong credentials", error);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser');
    setUser(null)
  }  

  return (
    <div className="App">
      {user === null && (
        <Togglable openText="login">
          <LoginForm
            handleLogin={handleLogin}
            handleUsername={({ target }) => setUsername(target.value)}
            handlePassword={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
        </Togglable>
      )}
      {user !== null && (
        <div>
          <p>Hello {user.name}</p>
          <Button text="log out" onClick={handleLogout} />
          <Togglable openText="add new note" ref={noteFormRef}>
            <NoteForm newNote={newNote} handleNewNote={handleNewNote} addNote={addNote} />
          </Togglable>
        </div>
      )}

      <Notification
        type="success"
        isShown={showNotification}
        text={`New note "${notes.slice(-1)[0] ? notes.slice(-1)[0].content : ''}" was created`}
      />
      <ul>{NotesList}</ul>

      <button
        onClick={() => {
          setShowAll(!showAll);
        }}
      >
        show {showAll ? "important" : "all"}
      </button>
    </div>
  );
}

export default NoteApp;
