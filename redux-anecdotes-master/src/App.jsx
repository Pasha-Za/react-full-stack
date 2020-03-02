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
import { gql } from "apollo-boost";
import Persons from './components/Persons';
import PersonForm from './components/PersonFrom';
import PhoneForm from './components/PhoneForm';

//context
// import { userContext } from './context/user';

const PERSON_DETAILS = gql`
  fragment PersonDetails on Person {
    id
    name
    phone 
    address {
      street 
      city
    }
  }
`

const ALL_PERSONS = gql`
  {
    allPersons {
      name
      id
      phone
    }
  }
`;

const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`;

const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const App = ({ initNotes }) => {
  useEffect(() => {
    initNotes();
  }, [initNotes]);

  // Context state
  // const { token, setToken } = useContext(userContext);

  const [token, setToken] = useState(null);

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

  // error message
  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  // logout function
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

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
    <div>
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