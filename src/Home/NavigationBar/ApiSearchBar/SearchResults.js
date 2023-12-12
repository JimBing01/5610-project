import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

function SearchResults() {
    const { criteria } = useParams();
    const location = useLocation();
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (location.state && location.state.error) {
            setError(location.state.error);
            return;
        }

        if (!criteria) {
            setError('No search criteria provided.');
            return;
        }

        const fetchResults = async () => {
    setIsLoading(true);
    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/jokes?limit=${criteria}`, {
            method: 'GET',
            headers: { 'X-Api-Key': '9sZqJjIclxuWHmvN+omW6w==zDckrpQWFlQhoGjA' }
        });

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const data = await response.json();
        setResults(data);
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
    setIsLoading(false);
};


        fetchResults();
    }, [criteria, location.state]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!results.length) return <div>No results found. Try searching for jokes!</div>;

    return (
        <div>
            {results.map((joke, index) => (
                <p key={index}>{joke.joke}</p>
            ))}
        </div>
    );
}

export default SearchResults;
