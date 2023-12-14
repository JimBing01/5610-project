import React, {useState, useEffect} from "react"
import * as client from "./client";

function SearchBar({ onSelectSandwich }) {
  const [searchResults, setSearchResults] = useState([]);

	const [searchInput, setSearchInput] = useState("");

	const fetchSandwiches = async () => {
    if (searchInput) {
        try {
            const sandwiches = await client.getSandwichByName(searchInput);
            setSearchResults(sandwiches);
        } catch (error) {
            console.error("Error fetching sandwiches:", error);
            setSearchResults([]);
        }
    } else {
        setSearchResults([]);
    }
};


	useEffect(() => {
		fetchSandwiches();
	}, [searchInput]);

	const [selectedSandwich, setSelectedSandwich] = useState(null);
  
  const selectSandwich = (sandwich) => {
    onSelectSandwich(sandwich); 
    setSearchResults([]);
};

	return (
		<div>
			<input
				type="search"
				className="form-control"
				placeholder="Search..."
				onChange={(e) => setSearchInput(e.target.value)}
			/>

			{searchResults.length > 0 && (
				<div className="dropdown">
					{searchResults.map((sandwich, index) => (
						<div
							key={index}
							className="dropdown-item"
							onClick={() => selectSandwich(sandwich)}>
							{sandwich.name}
						</div>
					))}
				</div>
			)}
		</div>
	);
}


export default SearchBar;