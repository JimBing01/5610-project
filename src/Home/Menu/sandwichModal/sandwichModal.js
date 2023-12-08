import React, {useEffect, useState} from 'react';
import "./index.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import db from "../../../Database";
import {useParams} from "react-router-dom";
import * as client from "./client";



function SandwichModal({ sandwich, onClose }) {
    const { userId } = useParams();
    const [reviews, setReviews] = useState([]); 
    const [shoppingCarts, setShoppingCarts] = useState(
        db.shoppingCart.filter((user) => user.userId === userId));

    const [currentItem, setCurrentItem] = useState({
        "_id":new Date() + sandwich.name,
        "userId": userId,
        "name": sandwich.name,
        "description": sandwich.description,
        "price": sandwich.price,
        "image": sandwich.image,
        "quantity": 1
    });

    useEffect(() => {
        console.log("UserID:", userId); // Log to check if userId is defined
        console.log("Sandwich ID:", sandwich._id); // Log to check sandwich ID
        if (sandwich && sandwich._id) {
            client.fetchReviewsBySandwichId(sandwich._id)
                 .then(setReviews)
                 .catch(error => {
                     // Handle or log the error if needed
                     console.error("Failed to fetch reviews:", error);
                 });
        }
        // Fetch shopping cart data from the server
        client.addShoppingCart(userId).then(setShoppingCarts);
    }, [sandwich.name, userId]);


    if (!sandwich) return null;


    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClose();
        }
    };

    const addCart = () => {
        client.addShoppingCart(userId, currentItem).then((wholeShoppingCarts) => {
            setShoppingCarts(wholeShoppingCarts)
        });
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
                        <AiOutlineShoppingCart className="cart-icon" onClick={addCart}/>
                    </div>
                </div>
               
                <div className="reviews-section">
                    {reviews.map((review, index) => (
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
