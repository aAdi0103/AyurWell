// RemediesPage.js
import React, { useState, useEffect } from 'react';
import ShowRemedies from './ShowRemedies';
import remediesData from '../../Components/RemediesData';

const Remedies = () => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(remediesData[0]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    const found = remediesData.find((item) =>
      item.disease_name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(found || remediesData[0]);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Remedies & Treatment</h1>
      <input
        type="text"
        placeholder="Search for an issue..."
        value={query}
        onChange={handleSearch}
        className="w-full border p-2 rounded mb-6"
      />
      <ShowRemedies remedy={filtered} />
    </div>
  );
};

export default Remedies;
