// components/SearchData.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchData({ handleSearch }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search by invoice ID..."
        value={searchInput}
        onChange={handleSearchChange}
      />
      <button className="btn btn-primary" onClick={() => handleSearch(searchInput)}>Search</button>
    </div>
  );
}

export default SearchData;
