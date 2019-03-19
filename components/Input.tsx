import React from "react";

const Input = ({ disabled, handleInput }) => {
  return (
    <input
      type="text"
      placeholder="YouTube URL or Video ID"
      disabled={disabled}
      onChange={handleInput}
    />
  );
};

export default Input;