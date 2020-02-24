import React, {useState} from 'react';

const PhoneForm = ({ editNumber }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const submit = async e => {
    e.preventDefault();

    await editNumber({
      variables: { name, phone }
    });

    setName("");
    setPhone("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone{" "}
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button type="submit">change number</button>
      </form>
    </div>
  );
};
 
export default PhoneForm;