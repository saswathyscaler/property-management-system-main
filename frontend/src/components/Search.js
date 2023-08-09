import React, { useState } from 'react';

const Search= () => {
  const [searchInput, setSearchInput] = useState('');
  const [filter1Value, setFilter1Value] = useState('');
  const [filter2Value, setFilter2Value] = useState('');
  const [filter3Value, setFilter3Value] = useState('');

  const handleSearch = () => {
    // Perform search or filtering logic here
    // You can use the state values to make API calls or update the UI

    console.log('Search Input:', searchInput);
    console.log('Filter 1 Value:', filter1Value);
    console.log('Filter 2 Value:', filter2Value);
    console.log('Filter 3 Value:', filter3Value);
  };

  return (
    <div className="search-container">
      
      <select value={filter1Value} onChange={(e) => setFilter1Value(e.target.value)}>
        <option value="">Select Filter 1</option>
        <option value="filter1_option1">Filter 1 Option 1</option>
        <option value="filter1_option2">Filter 1 Option 2</option>
      </select>
      <select value={filter2Value} onChange={(e) => setFilter2Value(e.target.value)}>
        <option value="">Select Filter 2</option>
        <option value="filter2_option1">Filter 2 Option 1</option>
        <option value="filter2_option2">Filter 2 Option 2</option>
      </select>
      <select value={filter3Value} onChange={(e) => setFilter3Value(e.target.value)}>
        <option value="">Select Filter 3</option>
        <option value="filter3_option1">Filter 3 Option 1</option>
        <option value="filter3_option2">Filter 3 Option 2</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
