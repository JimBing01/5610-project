import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import "./index.css";
import { useNavigate } from "react-router-dom";

function ApiSearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!/^\d+$/.test(searchTerm)) { // If input is not a number
            navigate("/search?error=true");
        } else {
            navigate(`/search/${searchTerm}`);
        }
    };

    return (
        <div className="remote-api-search-bar">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="Input a number < 10"
                    className="form-control"
                />
                {/* <button type="submit" className="search-button">
                    <CgSearch size={20}/> 
                </button> */}
            </form>
        </div>
    );
}

export default ApiSearchBar;
