import React, { useState, useEffect } from 'react';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setError(''); 
      return;
    }

    const getData = async () => {
      try {
        const response = await fetch(`your_api_endpoint?q=${query}`);
        const data = await response.json();

        if (data.length === 0) {
          setError('Your search did not return any results.');
        } else {
          setResults(data);
          setError('');
        }
      } catch (error) {
        setError('Something went wrong with the server or network.');
        setResults([]);
      }
    };

    const debounceTimeout = setTimeout(getData, 300);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {error && <p>{error}</p>}
      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default SearchComponent;