import React from "react";
import { setFilter } from "../reducers/filterReducer";
import { connect } from "react-redux";
import { useStateValue } from "../context/contextState";

const Filter = ({setFilter}) => {
  // Context state
  const [{ user: { token } }] = useStateValue();

  const handleChange = event => {
    setFilter(event.target.value);
  };
  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      <p>current token: {token}</p>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  setFilter
}

export default connect(null, mapDispatchToProps)(Filter);
