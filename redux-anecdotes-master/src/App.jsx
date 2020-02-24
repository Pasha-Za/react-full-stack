import React, { useEffect, useState } from "react";
import NewNote from './components/NewNote';
import NotesList from './components/NotesList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import {initNotes} from './reducers/anecdoteReducer';
import { connect } from 'react-redux';

//gql
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Persons from './components/Persons';
import PersonForm from './components/PersonFrom';
import PhoneForm from './components/PhoneForm';

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
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`;

const App = ({ initNotes }) => {
  useEffect(() => {
    initNotes();
  }, [initNotes]);

  const [errorMessage, setErrorMessage] = useState(null);
  const handleError = error => {
    setErrorMessage(error.graphQLErrors[0].message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const persons = useQuery(ALL_PERSONS);

  const [addPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: handleError
  });

  const [editNumber] = useMutation(EDIT_NUMBER);

  return (
    <div>
      <Notification />
      <Filter />
      <NotesList />
      <NewNote />

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      <Persons result={persons} />

      <h2>Create a person</h2>
      <PersonForm addPerson={addPerson} />

      <h2>change number</h2>
      <PhoneForm editNumber={editNumber} />
    </div>
  );
};

export default connect(null, { initNotes })(App);