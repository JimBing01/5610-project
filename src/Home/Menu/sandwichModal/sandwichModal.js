import React from 'react';
import "./index.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import reviewsDatabase from "../../../Database/Reviews.json";

function SandwichModal({ sandwich, onClose }) {
    const sandwichData = reviewsDatabase.find(s => s.name === sandwich.name) || { reviews: [] };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="sandwich-details">
                    <img src={sandwich.image} alt={sandwich.name} />
                    <div className="sandwich-info">
                        <h2>{sandwich.name}</h2>
                        <p>{sandwich.description || "Delicious sandwich"}</p>
                        <p>Price: {sandwich.price}</p>
                        <button onClick={onClose}>Close</button>
                        <AiOutlineShoppingCart className="cart-icon" />
                    </div>
                </div>
               
                <div className="reviews-section">
                    {sandwichData.reviews.map((review, index) => (
                        <div key={index} className="review">
                            <p>Rating: {review.rating}</p>
                            <p>{review.body}</p>
                            <p>Author: {review.author}</p>
                            <p>Date: {new Date(review.date).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default SandwichModal;
