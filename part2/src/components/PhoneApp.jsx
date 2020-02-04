import React, { useState, useEffect } from 'react';
import PhoneContact from './PhoneContact';
import PhoneFilter from './PhoneFilter';
import PhoneService from '../services/phone';

const PhoneApp = () => {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
      PhoneService.getAll().then(initialData => {
        setContacts(initialData);
        console.log("use effect");
      });
    }, []);
     console.log("render", contacts.length);

    const contactsToShow = searchValue
      ? contacts.filter(contact =>
          contact.name
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase())
        )
      : contacts;

    const addNewContact = (event) => {
        event.preventDefault();

        const newContactObj = {
          name: newContact,
          number: newPhone
        };

        if (isNewContactExist()) {
            PhoneService.update(isNewContactExist().id, {
              ...isNewContactExist(),
              number: newPhone
            }).then(updatedContact => {
              setContacts(
                contacts.map(contact =>
                  contact.id !== isNewContactExist().id
                    ? contact
                    : updatedContact
                )
              );
              setNewContact("");
              setNewPhone("");
            });
        } else if (newContact && newPhone) {
            PhoneService.create(newContactObj).then(newContact => {
              setContacts(contacts.concat(newContact));
              setNewContact('');
              setNewPhone('');
            });
        } else {
            alert('Some fields are empty')
        }
    }

    const deleteContact = id => () => {
      PhoneService.remove(id).then(() => {
        setContacts(contacts.filter(contact => contact.id !== id));
      });
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

    const contactList = contactsToShow.map(contact => (
      <PhoneContact
        name={contact.name}
        number={contact.number}
        key={contact.name}
        deleteContact={deleteContact(contact.id)}
      />
    ));

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