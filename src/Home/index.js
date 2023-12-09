import React, {useEffect, useState} from 'react';
import NavigationBar from "./NavigationBar";
import SandwichSlider from "./Slider/SandwichSlider";
import Menu from "./Menu";
import "./index.css";    
import {BrowserRouter as Router, Routes, Route, useParams,} from 'react-router-dom';
import {useLocation} from "react-router-dom";
import User from "../User";
import SandwichModal from "./Menu/sandwichModal/sandwichModal";
import * as client from "./client";



function Home() {
	const {userId} = useParams();
	const location = useLocation();
	const [selectedSandwich, setSelectedSandwich] = useState(null);
	const [userInfo, setUserInfo] = useState({ firstName: '' }); // Added userInfo state

	const handleSelectSandwich = (sandwich) => {
		console.log("Selected Sandwich: ", sandwich); // Check if this logs the correct sandwich
		setSelectedSandwich(sandwich);
	};

	useEffect(() => {
		if (userId) {
			client.getUserById(userId)
  .then((user) => {
    setUserInfo(user); // This should set the userInfo state to the user object
  })
  .catch(error => console.error('Error fetching user data:', error));
		}
	}, [userId]);
	const displayWelcomeSlogan = location.pathname.includes('/user/'); // Check if URL contains '/user/'

    return (
			<div className="home">
				<NavigationBar
					userId={userId}
					onSelectSandwich={handleSelectSandwich}
				/>
				 {displayWelcomeSlogan && userInfo.firstName && (
  <div className="welcome-slogan">Hello {userInfo.firstName}! Fresh, Delicious Sandwiches Await You</div>
)}

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