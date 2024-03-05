import React from 'react';

function InputField({ label, id, name, value, onChange, type = "text" }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <br/>
      <input
        type={type}
        className="form-control"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default InputField;
