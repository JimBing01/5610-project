import React, { useState, useEffect } from "react";
import "./index.css";
import { TfiAlignJustify } from "react-icons/tfi";
import bfSandwichesDatabase from "../../Database/Sandwiches/BreakfastSandwiches.json";
import popularSandwichesDatabase from "../../Database/Sandwiches/PopularItems.json";
import sandwichesAndSubsDatabase from "../../Database/Sandwiches/SandwichesAndSubs.json";
import { IoAddOutline } from "react-icons/io5";
import SandwichModal from "./sandwichModal/sandwichModal";
import * as client from "./client";

function Menu() {
	const [activeMenu, setActiveMenu] = useState("popular");
	const [selectedSandwich, setSelectedSandwich] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [sandwiches, setSandwiches] = useState([]);
	const [sandwich, setSandwich] = useState({
		name: "",
		description: "",
		price: 0,
		image: "",
	});
	const [selectedImage, setSelectedImage] = useState(null);
	const [imageName, setImageName] = useState("");
	const [imageURL, setImageURL] = useState("");
	const handleImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setSelectedImage(file);
			setImageName(file.name); // Set the image name
			setImageURL(URL.createObjectURL(file)); // Set the image URL for display
		}
	};

	const handleImageUpload = () => {
		// Convert the selected image to a data URL for display
		if (selectedImage) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageURL(reader.result); // This will be a data URL, not a true 'upload'
				sandwich.image = reader.result; // Update sandwich image for updating or adding
			};
			reader.readAsDataURL(selectedImage);
		}
	};
	const handleMenuClick = (menu) => {
		setActiveMenu(menu);
	};

	const handleCardClick = (sandwich) => {
		setSelectedSandwich(sandwich);
		setIsModalOpen(true);
		setImageURL(sandwich.image); // Set the current image URL for display
		setImageName(sandwich.image.split('/').pop()); // Extract and set image name from URL
		setSelectedImage(null); // Reset selected image
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedSandwich(null);
	};

	const renderSandwiches = (sandwiches) => {
		return sandwiches.map((sandwich, index) => (
			<div
				key={index}
				className="sandwich-card">
				<div onClick={() => handleCardClick(sandwich)}>
					<img
						src={sandwich.image}
						alt={sandwich.name}
					/>
					<h3>{sandwich.name}</h3>
					<p>{sandwich.description || "Delicious sandwich"}</p>
					<span>${sandwich.price}</span>
				</div>

				{/* <IoAddOutline className="add-icon" /> */}

				<button
					className="btn btn-warning"
					onClick={() => {
						setSandwich(sandwich);
					}}>
					Edit
				</button>
				<button
					className="btn btn-danger"
					onClick={() => {
						handleDeleteSandwich(sandwich._id);
					}}>
					Delete
				</button>
			</div>
		));
	};

	// const handleAddSandwich = () => {
	// 	client.createSandwich(sandwich, activeMenu).then((data) => {
	// 		setSandwiches(data);
	// 	});
	// };
	const handleAddSandwich = () => {
		// If a new image has been selected and the imageURL state has been updated, use it
		if (selectedImage && imageURL !== sandwich.image) {
			sandwich.image = imageURL;
		}
	
		client.createSandwich(sandwich, activeMenu).then((data) => {
			setSandwiches(data);
		});
	};
	

	// const handleUpdateSandwich = async () => {
	// 	client.updateSandwich(sandwich, activeMenu).then((data) => {
	// 		setSandwiches(data);
	// 	});
	// };
	const handleUpdateSandwich = async () => {
		// If a new image has been selected and the imageURL state has been updated, use it
		if (selectedImage && imageURL !== sandwich.image) {
			sandwich.image = imageURL;
		}
	
		client.updateSandwich(sandwich, activeMenu).then((data) => {
			setSandwiches(data);
		});
	};
	

	const handleDeleteSandwich = (sandwichId) => {
		client.deleteSandwich(sandwichId, activeMenu).then((data) => {
			setSandwiches(data);
		});
	};

	useEffect(() => {
		if (isModalOpen) {
			document.body.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
		}

		client.findSandwiches(activeMenu).then((items) => setSandwiches(items));
		return () => document.body.classList.remove("no-scroll");
	}, [isModalOpen, activeMenu]);

	return (
		<div className="menu">
			<span style={{ marginRight: "5px" }}>Sandwich Name:</span>
			<input
				value={sandwich.name}
				onChange={(e) => setSandwich({ ...sandwich, name: e.target.value })}
			/>
			<button
				className="btn btn-success"
				style={{ marginLeft: "20px" }}
				onClick={handleAddSandwich}>
				Add
			</button>
			<button
				className="btn btn-primary"
				style={{ marginLeft: "20px" }}
				onClick={() => handleUpdateSandwich()}>
				Update
			</button>
			<br />
			<br />
			Description:
			<textarea
				value={sandwich.description}
				cols="50"
				onChange={(e) =>
					setSandwich({ ...sandwich, description: e.target.value })
				}
			/>
			<br />
			<br />
			<span style={{ marginRight: "5px" }}>Sandwich price:</span>
			<input
				value={sandwich.price.toString()}
				onChange={(e) => setSandwich({ ...sandwich, price: e.target.value })}
			/>
			<br />
			<br />
			<span style={{ marginRight: "5px" }}>Sandwich image:</span>
			<input
				type="file"
				accept="image/*"
				style={{ display: "none" }}
				id="image-upload"
				onChange={handleImageChange}
			/>
			{/* 
			{imageURL && (
				<img
					src={imageURL}
					alt="Selected Sandwich"
					style={{ width: "100px", height: "auto", marginLeft: "10px" }}
				/>
			)} */}
			<input
				type="text"
				value={imageName}
				readOnly
				placeholder="No file chosen"
				style={{ marginLeft: "10px" }}
			/>
			<button
				className="btn btn-secondary"
				onClick={() => document.getElementById("image-upload").click()}>
				Choose Image
			</button>
			<button
				className="btn btn-success"
				style={{ marginLeft: "20px" }}
				onClick={handleImageUpload}>
				Upload
			</button>
			<div className="menu-list">
				<ul>
					<TfiAlignJustify />
					<li
						onClick={() => {
							handleMenuClick("popular");
							client
								.findSandwiches(activeMenu)
								.then((items) => setSandwiches(items));
						}}>
						Popular Items
					</li>
					<li
						onClick={() => {
							handleMenuClick("breakfast");
							client
								.findSandwiches(activeMenu)
								.then((items) => setSandwiches(items));
						}}>
						Breakfast Sandwiches
					</li>
					<li
						onClick={() => {
							handleMenuClick("subs");
							client
								.findSandwiches(activeMenu)
								.then((items) => setSandwiches(items));
						}}>
						Sandwiches and Subs
					</li>
				</ul>
			</div>
			<div className="menu-content">
				{activeMenu === "popular" && renderSandwiches(sandwiches)}
				{activeMenu === "breakfast" && renderSandwiches(sandwiches)}
				{activeMenu === "subs" && renderSandwiches(sandwiches)}
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
