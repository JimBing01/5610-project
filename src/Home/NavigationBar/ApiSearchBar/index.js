import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import "./index.css"
import {useNavigate} from "react-router-dom";

function ApiSearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [jokes, setJokes] = useState([]);


    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const limit = parseInt(searchTerm, 10) || 1; // Default to 1 joke if input is not a number
        const jokes = await fetchJokes(limit);

        console.log('Jokes fetched:', jokes);
         
        const jokesFetched = await fetchJokes(limit);
        setJokes(jokesFetched);
    };

    const fetchJokes = async (limit) => {
        try {
            const response = await fetch(`https://api.api-ninjas.com/v1/jokes?limit=${limit}`, {
                method: 'GET',
                headers: { 'X-Api-Key': '9sZqJjIclxuWHmvN+omW6w==zDckrpQWFlQhoGjA' },
                contentType: 'application/json',
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            return await response.json();
        } catch (error) {
            console.error('Error fetching jokes:', error);
        }
    };


    return (
        <div className="remote-api-search-bar">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="how many jokes you wanna get?"
                    className="form-control"
                />
                <button type="submit" className="search-button">
                    <CgSearch size={20}/> 
                </button>
            </form>
            <div>
                {jokes.map((joke, index) => (
                    <p key={index}>{joke.joke}</p>
                ))}
            </div>
        </div>
    );
}


export default ApiSearchBar;
