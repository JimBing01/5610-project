import React from 'react';
import NavigationBar from "./NavigationBar";
import SandwichSlider from "./Slider/SandwichSlider";
import Menu from "./Menu";
import "./index.css";    
import {BrowserRouter as Router, Routes, Route, useParams,} from 'react-router-dom';
import User from "../User";


function Home() {
	const {userId} = useParams();

    return (
		<div className="home">
			<NavigationBar userId={userId}/>
			<SandwichSlider />
			<div id="menu-section-on-home-page" className="menu-section">
				<Menu />
			</div>
		</div>
		);
}

export default Home;