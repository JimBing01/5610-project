import React, {useState, useEffect} from "react"
import { CiSearch } from "react-icons/ci";
import * as client from "./client";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");

  const fetchSandwiches= async() => {
    const sandwiches = await client.getSandwichByName(searchInput);
    console.log(sandwiches);
  }
  useEffect(() => {
    fetchSandwiches();
  }, []);

  return (
    <div>
      <input
        type="search"
        className="form-control"
        placeholder="Search..."
        aria-label="Search"
        aria-describedby="search-addon"
      />
      <CiSearch />
    </div>
  );
}


export default SearchBar;