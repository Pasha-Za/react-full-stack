import React from 'react';

const Profile = ({ name, age }) => {
    const guesYear = () => new Date().getFullYear() - age

    return (
    <>
        <p>Name: {name}, age: {age}</p>
        <p>Info: <br/>
            Born in {guesYear()}
        </p>
    </>
    )
}

export default Profile