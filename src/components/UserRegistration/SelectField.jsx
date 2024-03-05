import React from 'react';

function SelectField({ label, id, name, value, onChange, options }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <br/>
      <select
        className="form-select"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
      >
        <option value=""></option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
