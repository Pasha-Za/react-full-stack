import React, {useEffect} from 'react';
import NewNote from './components/NewNote';
import NotesList from './components/NotesList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import {initNotes} from './reducers/anecdoteReducer';
import { connect } from 'react-redux';

const App = ({ initNotes }) => {
  useEffect(() => {
    initNotes();
  });

  return (
    <div>
      <Notification />
      <Filter />
      <NotesList />
      <NewNote />
    </div>
  );
};

export default connect(null, { initNotes })(App);