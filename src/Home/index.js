import React from 'react';
import NavigationBar from "./NavigationBar";
import SandwichSlider from "./Slider/SandwichSlider";
import "./index.css";    



function Home() {
    const sandwiches = [
			{
				name: "Phi Gamma Melta",
				description: "",
				image: "/images/sandwiches/Phi_Gamma_Melta.jpg",
			},
			{
				name: "The Huskies",
				description: "",
				image: "/images/sandwiches/The_Huskies.jpg",
			},
			{
				name: "The Boston Connection",
				description: "",
				image: "/images/sandwiches/The_Boston_Connection.jpg",
			},
			{
				name: "Game of Thrones",
				description: "",
				image: "/images/sandwiches/Game_of_Thrones.jpg",
			},
			{
				name: "George Likes his Chicken Spicy",
				description: "",
				image: "/images/sandwiches/George_Likes_his_Chicken_Spicy.jpg",
			},
			{
				name: "The Hemenway",
				description: "",
				image: "/images/sandwiches/The_Hemenway.jpg",
			},
			{
				name: "The Huntington",
				description: "",
				image: "/images/sandwiches/The_Huntington.jpg",
			},
		];
    return (
			<div className="home">
				<NavigationBar />
                <SandwichSlider />
			</div>
		);
}

export default Home;