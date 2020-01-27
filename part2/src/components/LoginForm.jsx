import React from 'react';

const LoginForm = ({ handleLogin, handleUsername, handlePassword, username, password }) => {
  return (
    <form className="login" onSubmit={handleLogin}>
      <label htmlFor="user">login</label>
      <input
        type="text"
        value={username}
        id="user"
        onChange={handleUsername}
      />
      <label htmlFor="pass">password</label>
      <input
        type="password"
        value={password}
        id="pass"
        onChange={handlePassword}
      />
      <button type="submit">log in</button>
    </form>
  );
};
 
export default LoginForm;