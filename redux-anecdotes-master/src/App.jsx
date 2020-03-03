import React, { useEffect, useState, useContext } from "react";
import NewNote from './components/NewNote';
import NotesList from './components/NotesList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import LoginForm from './components/LoginForm';
import {initNotes} from './reducers/anecdoteReducer';
import { connect } from 'react-redux';

//gql
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import Persons from './components/Persons';
import PersonForm from './components/PersonFrom';
import PhoneForm from './components/PhoneForm';

import { CREATE_PERSON } from './gql/mutations/createPerson'
import { EDIT_NUMBER } from './gql/mutations/editNumber'
import { LOGIN } from './gql/mutations/login'
import { ALL_PERSONS } from './gql/queries/allPersons'

//context
import { useStateValue } from './context/contextState';

import ThemeToggler from './components/ThemeToggler';
import './styles/index.scss';

const bodyClassToggler = (cssClass) => {
  document.body.classList.contains('white') && document.body.classList.remove('white');
  document.body.classList.contains('black') && document.body.classList.remove('black');
  document.body.classList.add(cssClass);
};

const App = ({ initNotes }) => {
  
  // Context state
  const [{ user:{ token }, theme:{theme} }, dispatch] = useStateValue();
  
  useEffect(() => {
    initNotes();
    console.log('Notes watch');
  }, [initNotes]);

  useEffect(() => {
    console.log("Theme was changed to " + theme);
    bodyClassToggler(theme);
  }, [theme]);

  // const [token, setToken] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const handleError = error => {
    setErrorMessage(error.graphQLErrors[0].message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const client = useApolloClient();

  const persons = useQuery(ALL_PERSONS);

  const [addPerson] = useMutation(CREATE_PERSON, {
    // refetchQueries: [{ query: ALL_PERSONS }],
    onError: handleError,
    update: (store, response) => {      
      const dataInStore = store.readQuery({ query: ALL_PERSONS })
      dataInStore.allPersons.push(response.data.addPerson)
      store.writeQuery({
        query: ALL_PERSONS,
        data: dataInStore
      })
    }
  });

  const [editNumber] = useMutation(EDIT_NUMBER);

  const [login] = useMutation(LOGIN, {
    onError: handleError
  });

  const setToken = (token) => {
    console.log(token);
    
    dispatch({
      type: 'setToken',
      payload: token
    });
  };

  // error message
  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  // logout function
  const logout = () => {
    dispatch({
      type: 'setToken',
      payload: null
    });
    localStorage.clear()
    client.resetStore()
  }

  const currentTheme = () => theme;

  if(!token) {
    return (
      <div>
        {errorNotification()}
        <h2>Login</h2>
        <LoginForm
          login={login}
          setToken={(token) => setToken(token)}
        />
      </div>
    )
  }

  return (
    <div className={currentTheme()}>
      <ThemeToggler />

      <Notification />
      <Filter />
      <NotesList />
      <NewNote />

      <button onClick={() => logout()}>logout</button>

      {errorNotification()}

      <Persons result={persons} />

      <h2>Create a person</h2>
      <PersonForm addPerson={addPerson} />

      <h2>change number</h2>
      <PhoneForm editNumber={editNumber} />
    </div>
  );
};

export default connect(null, { initNotes })(App);