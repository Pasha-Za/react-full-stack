import React, { useState } from 'react';
import PhoneContact from './PhoneContact';
import PhoneFilter from './PhoneFilter';

const PhoneApp = () => {
    const [contacts, setContacts] = useState([
      { name: "Arto Hellas", number: "040-123456" },
      { name: "Ada Lovelace", number: "39-44-5323523" },
      { name: "Dan Abramov", number: "12-43-234345" },
      { name: "Mary Poppendieck", number: "39-23-6423122" }
    ]);
    const [newContact, setNewContact] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [searchValue, setSearchValue] = useState('');

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