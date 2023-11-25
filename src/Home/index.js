import React from 'react';
import NavigationBar from "./NavigationBar";
import SandwichSlider from "./Slider/SandwichSlider";
import Menu from "./Menu";
import "./index.css";    
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import User from "../User";


function Home() {
    return (
			<div className="home">
				<NavigationBar />
      	<SandwichSlider />
				<div id="menu-section-on-home-page">
        	<Menu />
      	</div>

				
			</div>
		);
}

export default Home;