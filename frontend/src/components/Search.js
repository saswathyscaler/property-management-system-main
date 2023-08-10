import React, { useState } from 'react';

const Search = () => {
  const [filter1Value, setFilter1Value] = useState('');
  const [filter2Value, setFilter2Value] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);

  const handleSearch = async () => {
    try {
      // Construct the URL based on selected filter values
      const baseUrl = 'http://localhost:7000'; // Replace with your API base URL
      const queryParams = new URLSearchParams({
        price: filter1Value,
        location: filter2Value,
      });

      const url = `${baseUrl}/property/showproperty?${queryParams}`;

      const response = await fetch(url);
      const data = await response.json();
      setFilteredProperties(data);
    } catch (error) {
      console.error('Error fetching filtered properties:', error);
    }
  };

  return (
    <div className="search-container p-4 bg-blue-100">
      <div className="flex space-x-4 items-center">
        <select
          value={filter1Value}
          onChange={(e) => setFilter1Value(e.target.value)}
          className="p-2 border rounded-md  bg-blue-200"
        >
          <option value="">Price</option>
          <option value="10000-50000">10000-50000</option>
          <option value="50000-2500000">50000-2500000</option>
          <option value="250000-5000000">250000-5000000</option>
          <option value="5000000-1000000000">5000000-10000000000000</option>
        </select>
        <select
          value={filter2Value}
          onChange={(e) => setFilter2Value(e.target.value)}
          className="p-2 border rounded-md  bg-blue-200"
        >
          <option value="">Location</option>
          <option value="Delhi">Delhi</option>
          <option value="bbsr">bbsr</option>
          <option value="mumbai">mumbai</option>
          <option value="ctc">ctc</option>
          <option value="Japan">Japan</option>
        </select>
        
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Search
        </button>


        </div>
        {/* Display filtered properties */}
        {filteredProperties.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Filtered Properties:</h2>
            <ul className="mt-2">
              {filteredProperties.map((property) => (
                <li key={property._id}>{property.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
  
  );
};

export default Search;
