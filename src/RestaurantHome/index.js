import React, {useState} from 'react';
import NavigationBar from "./NavigationBar";
import SandwichSlider from "./Slider/SandwichSlider";
import Menu from "./Menu";
import "./index.css";    
import {BrowserRouter as Router, Routes, Route, useParams,} from 'react-router-dom';
import User from "../User";
import SandwichModal from "./Menu/sandwichModal/sandwichModal";



function Home() {
	const {userId} = useParams();
	const [selectedSandwich, setSelectedSandwich] = useState(null);

	const handleSelectSandwich = (sandwich) => {
		console.log("Selected Sandwich: ", sandwich); // Check if this logs the correct sandwich
		setSelectedSandwich(sandwich);
	};

    return (
			<div className="home">
				<NavigationBar
					userId={userId}
					onSelectSandwich={handleSelectSandwich}
				/>
				{selectedSandwich && (
					<SandwichModal
						sandwich={selectedSandwich}
						onClose={() => setSelectedSandwich(null)}
					/>
				)}
				<SandwichSlider />
				<div
					id="menu-section-on-home-page"
					className="menu-section">
					<Menu />
				</div>
			</div>
		);
}

export default Home;