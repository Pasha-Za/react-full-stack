import React from 'react';

const PhoneContact = ({ name, number, deleteContact }) => (
  <li>
    name: {name}, number: {number}
    <button onClick={deleteContact}>delete</button>
  </li>
);
 
export default PhoneContact;