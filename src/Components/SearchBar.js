import React, { useState, useEffect } from "react";

function SearchBar({ onSearch, onReset }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleReset = () => {
    setValue("");
    onReset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        Search
      </button>
      <button className="btn btn-secondary" type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
}

export default SearchBar;
