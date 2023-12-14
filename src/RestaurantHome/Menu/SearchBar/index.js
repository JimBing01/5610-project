import React, {useState, useEffect} from "react"
import { CiSearch } from "react-icons/ci";
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
            // Optionally, you can set some state to show an error message to the user
            // For example: setError('Failed to fetch sandwiches');
            setSearchResults([]); // Clear results or handle as needed
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
    onSelectSandwich(sandwich); // Use the callback function passed from the parent
    setSearchResults([]); // Close the dropdown
};

	// When rendering the SandwichModal, pass the selectedSandwich

	return (
		<div>
			{/* <CiSearch /> */}
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