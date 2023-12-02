import React, { useState, useEffect } from "react";
import "./index.css";
import { TfiAlignJustify } from "react-icons/tfi";
import bfSandwichesDatabase from "../../Database/Sandwiches/BreakfastSandwiches.json";
import popularSandwichesDatabase from "../../Database/Sandwiches/PopularItems.json";
import sandwichesAndSubsDatabase from "../../Database/Sandwiches/SandwichesAndSubs.json";
import { IoAddOutline } from "react-icons/io5";
import SandwichModal from "./sandwichModal/sandwichModal";

function Menu() {
	const [activeMenu, setActiveMenu] = useState("popular");
	const [selectedSandwich, setSelectedSandwich] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);


	const handleMenuClick = (menu) => {
		setActiveMenu(menu);
	};

	const handleCardClick = (sandwich) => {
		setSelectedSandwich(sandwich);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedSandwich(null);
	};

	
	const renderSandwiches = (sandwiches) => {
		return sandwiches.map((sandwich, index) => (
			<div
				key={index}
				className="sandwich-card"
				onClick={() => handleCardClick(sandwich)}>
				<img
					src={sandwich.image}
					alt={sandwich.name}
				/>
				<h3>{sandwich.name}</h3>
				<p>{sandwich.description || "Delicious sandwich"}</p>
				<span>{sandwich.price}</span>
				<IoAddOutline className="add-icon" />
			</div>
		));
	};
	useEffect(() => {
		if (isModalOpen) {
			document.body.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
		}

		// Cleanup function
		return () => document.body.classList.remove("no-scroll");
	}, [isModalOpen]);


	return (
		<div className="menu">
			<div className="menu-list">
				<ul>
					<TfiAlignJustify />
					<li onClick={() => handleMenuClick("popular")}>Popular Items</li>
					<li onClick={() => handleMenuClick("breakfast")}>
						Breakfast Sandwiches
					</li>
					<li onClick={() => handleMenuClick("subs")}>Sandwiches and Subs</li>
				</ul>
			</div>

			<div className="menu-content">
				{activeMenu === "popular" &&
					renderSandwiches(popularSandwichesDatabase)}
				{activeMenu === "breakfast" && renderSandwiches(bfSandwichesDatabase)}
				{activeMenu === "subs" && renderSandwiches(sandwichesAndSubsDatabase)}
			</div>

			{isModalOpen && (
				<SandwichModal
					sandwich={selectedSandwich}
					onClose={closeModal}
				/>
			)}
		</div>
	);
}

export default Menu;
