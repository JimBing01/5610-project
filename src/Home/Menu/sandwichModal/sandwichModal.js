import React, { useState } from "react";
import "./index.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import reviewsDatabase from "../../../Database/Reviews.json";

function sandwichModal({ sandwich, onClose }) {
	if (!sandwich) return null;

	const handleOverlayClick = (e) => {
		if (e.target.classList.contains("modal-overlay")) {
			onClose();
		}
	};

  const reviews = sandwich.reviews || []; 
	return (
		<div
			className="modal-overlay"
			onClick={handleOverlayClick}>
			<div className="modal-content">
				<img
					src={sandwich.image}
					alt={sandwich.name}
				/>
				<h2>{sandwich.name}</h2>
				<p>{sandwich.description || "Delicious sandwich"}</p>
				<p>Price: {sandwich.price}</p>
				{/* Add Icon and other details */} <AiOutlineShoppingCart className="cart-icon"/>
				<div className="reviews-section">
					{/* Map through sandwich reviews and display them */}
          {reviews.map((review, index) => (
            <div key={index} className="review">
              <p>{review.text}</p>
              {/* Add more details like rating, author, etc. */}
            </div>
          ))}
				</div>
				<button onClick={onClose}>Close</button>
			</div>
		</div>
	);
}

export default sandwichModal;
