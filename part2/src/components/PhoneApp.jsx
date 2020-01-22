import React, { useState, useEffect } from 'react';
import PhoneContact from './PhoneContact';
import PhoneFilter from './PhoneFilter';
import axios from 'axios';

const PhoneApp = () => {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
      axios
        .get('http://localhost:3005/persons')
        .then(response => {
          setContacts(response.data);
           console.log("use effect");
        })
    }, []);
     console.log("render", contacts.length);

    const contactsToShow = searchValue
      ? contacts.filter(contact =>
          contact.name
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase())
        )
      : contacts;

    const contactList = contactsToShow.map(contact => (
      <PhoneContact
        name={contact.name}
        number={contact.number}
        key={contact.name}
      />
    ));

    const addNewContact = (event) => {
        event.preventDefault();

        const newContactObj = {
          name: newContact,
          number: newPhone
        };

        if (isNewContactExist()) {
            alert(`${newContact} is already added to phonebook`);
        } else if (newContact && newPhone) {
            setContacts(contacts.concat(newContactObj));
            setNewContact('');
            setNewPhone('');
        } else {
            alert('Some fields are empty')
        }
    }

    const handleNewContact = (event) => {
        setNewContact(event.target.value);
    }
    const handleNewPhone = (event) => {
        setNewPhone(event.target.value);
    }
    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    }

    const isNewContactExist = () => {     
        return contacts.find(contact => contact.name === newContact);
    }

    return (
      <div className="phone-board">
        <PhoneFilter searchValue={searchValue} onChange={handleSearch} />

        <h2>Phonebook</h2>

        <form onSubmit={addNewContact}>
          <label htmlFor="phoneName">name:</label>
          <input
            type="text"
            id="phoneName"
            onChange={handleNewContact}
            value={newContact}
          />

          <label htmlFor="phoneNumber">number:</label>
          <input
            type="number"
            id="phoneNumber"
            onChange={handleNewPhone}
            value={newPhone}
          />
          <button type="submit">add</button>
        </form>

        <h3>Contacts:</h3>
        <ul className="phone-numbers">{contactList}</ul>
      </div>
    );
}
 
export default PhoneApp;