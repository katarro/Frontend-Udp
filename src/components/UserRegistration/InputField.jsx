import React from 'react';

function InputField({ label, id, name, value, onChange, type = "text" }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <br/>
      <input
        type={type}
        className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
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
