import React, {useEffect} from 'react';
import {initNotes} from './reducers/anecdoteReducer';
import { connect } from 'react-redux';
import MainPage from './components/pages/MainPage';
import NewNotePage from "./components/pages/NewNotePage";
import {
  BrowserRouter as Router,
  Route, Link, Redirect,
} from 'react-router-dom'
import Note from './components/Note';
import NotesList from './components/NotesList';
import NoResultPage from './components/pages/NoResultPage';

//UI
import { Button, Icon, Input, Form, Checkbox, Card, Grid } from "semantic-ui-react";

const App = ({ initNotes, anecdotes }) => {

  useEffect(() => {
    initNotes();
  }, [initNotes]);

  const getNoteById = id =>
    anecdotes.find(anecdote => anecdote.id === id);

    return (
      <div>
        <Router>
          <nav>
            <Link to="/">
              <span>main</span>
            </Link>
            <Link to="/create">create new</Link>
            <Link to="/anecdotes">anecdotes</Link>
          </nav>
          <Route exact path="/" render={() => <MainPage />} />
          <Route path="/create" render={() => <NewNotePage />} />
          <Route path="/noresult" render={() => <NoResultPage />} />
          <Route
            exact
            path="/anecdotes"
            render={() => {
              return <NotesList anecdotes={anecdotes} />;
            }}
          />
          <Route
            exact
            path="/anecdotes/:id"
            render={({ match }) => {
              return <Note anecdote={getNoteById(match.params.id)} />;
            }}
          />
          <Route
            path="/admin"
            render={() => {
              return false ? <MainPage /> : <Redirect to="/noresult" />;
            }}
          />
        </Router>
        <footer>
          <hr />
          Dummy footer
        </footer>
      </div>
    );
};

const mapStateToProps = ({anecdotes}) => {
  return {
    anecdotes
  };
}

export default connect(mapStateToProps, { initNotes })(App);