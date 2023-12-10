import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

function SearchResults() {
    const { criteria } = useParams();
    const location = useLocation();
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            // Determine if criteria is in URL or query parameters
            let searchCriteria = criteria;
            if (!searchCriteria) {
                const searchParams = new URLSearchParams(location.search);
                searchCriteria = searchParams.get('criteria');
            }

            if (searchCriteria) {
                setIsLoading(true);
                try {
                    // Replace this URL with your actual API endpoint
                    const response = await fetch(`https://api.api-ninjas.com/v1/jokes?limit=${searchCriteria}`, {
                        method: 'GET',
                        headers: { 'X-Api-Key': 'YOUR_API_KEY' },
                        contentType: 'application/json',
                    });
                    const data = await response.json();
                    setResults(data);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [criteria, location.search]);

    if (isLoading) return <div>Loading...</div>;
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
