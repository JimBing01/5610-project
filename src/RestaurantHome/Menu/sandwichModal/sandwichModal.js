import React, {useEffect, useState} from 'react';
import "./index.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import reviewsDatabase from "../../../Database/Reviews.json";
import db from "../../../Database";
import {useParams} from "react-router-dom";
import * as client from "./client";



function SandwichModal({ sandwich, onClose }) {

    const { userId } = useParams();
    const [shoppingCarts, setShoppingCarts] = useState(
        db.shoppingCart.filter((user) => user.userId == userId));

    const [currentItem, setCurrentItem] = useState({
        "userId": userId,
        "name": sandwich.name,
        "description": sandwich.description,
        "price": sandwich.price,
        "image": sandwich.image,
        "quantity": 1
    });


    if (!sandwich) return null;

    const sandwichData = reviewsDatabase.find(s => s.name === sandwich.name) || { reviews: [] };

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
                <button className="close-button" onClick={onClose}>Close</button>
                <div className="sandwich-details">
                    <img src={sandwich.image} alt={sandwich.name} />
                    <div className="sandwich-info">
                        <h2>{sandwich.name}</h2>
                        <p>{sandwich.description || "Delicious sandwich"}</p>
                        <p>Price: {sandwich.price}</p>
                        
                        <AiOutlineShoppingCart className="cart-icon" onClick={()=>addCart()}/>
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
