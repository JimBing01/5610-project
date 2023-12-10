import React, {useEffect, useState} from 'react';
import "./index.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import db from "../../../Database";
import { useParams, Link } from "react-router-dom";
import * as client from "./client";
import { renderStars } from "../../../utils";
import {findShoppingCart} from "../../../User/ShoppingCart/client";



function SandwichModal({ sandwich, onClose }) {
	const { userId } = useParams();
	const [reviews, setReviews] = useState([]);
	const [shoppingCarts, setShoppingCarts] = useState([]);

	const [currentItem, setCurrentItem] = useState({
		_id: new Date() + sandwich.name,
		userId: userId,
		name: sandwich.name,
		description: sandwich.description,
		price: sandwich.price,
		image: sandwich.image,
		quantity: 1,
	});

	useEffect(() => {
		console.log("UserID:", userId); // Log to check if userId is defined
		console.log("Sandwich ID:", sandwich._id); // Log to check sandwich ID
		if (sandwich && sandwich._id) {
			client
				.fetchReviewsBySandwichId(sandwich._id)
				.then(setReviews)
				.catch((error) => {
					// Handle or log the error if needed
					console.error("Failed to fetch reviews:", error);
				});
		}

		findShoppingCart(userId).then((item) => {setShoppingCarts(item)} )
	}, [sandwich.name, userId]);

	if (!sandwich) return null;

	const handleOverlayClick = (e) => {
		if (e.target.classList.contains("modal-overlay")) {
			onClose();
		}
	};

	const addCart = () => {
		client.addShoppingCart(userId, currentItem).then((wholeShoppingCarts) => {
			setShoppingCarts(wholeShoppingCarts);
		});
	};

	const renderStars = (rating) => {
		let stars = [];
		for (let i = 0; i < rating; i++) {
			stars.push(<span key={i}>★</span>);
		}
		return stars;
	};

	return (
		<div
			className="modal-overlay"
			onClick={handleOverlayClick}>
			<div className="modal-content">
				{/* <button className="close-button" onClick={onClose}>Close</button> */}
				<div className="sandwich-details">
					<img
						src={sandwich.image}
						alt={sandwich.name}
					/>
					<div className="sandwich-info">
						<h2>{sandwich.name}</h2>
						<p>{sandwich.description || "Delicious sandwich"}</p>
						<p>Price: {sandwich.price}</p>


						<button type="button" className="btn position-relative" style={{marginTop:"5px"}}>
							<AiOutlineShoppingCart
								className="cart-icon"
								onClick={addCart}
							/>
							<span
								className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    							{shoppingCarts.length}
    								<span className="visually-hidden">unread messages</span>
  							</span>
						</button>




					</div>
				</div>
				{/* 
					<div className="reviews-section">
						{reviews.map((review, index) => (
							<div
								key={index}
								className="review">
                                <p>Author: {review.username}</p>
								<div className="rating">
									{renderStars(review.rating)}
								</div>
                                <p>Date: {new Date(review.date).toLocaleDateString()}</p>
								<p>{review.body}</p>
							</div>
						))}
					</div> */}
				<div className="reviews-section">
					{reviews
						.sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort reviews by date, newest first
						.map((review, index) => (
							<div
								key={index}
								className="review">
								<div className="review-header">
									<Link to={`/user/public/${review.userId}`} className="reviewer-link">
										<img
											src={`/images/customerIcon/${review.username}.png`}
											alt={`${review.username}'s Profile Pic`}
											className="reviewer-pic"
										/>
									</Link>
									<div className="reviewer-info">
										<Link
											to={`/user/public/${review.userId}`}
											className="reviewer-name">
											{review.username}
										</Link>
										<div className="rating">{renderStars(review.rating)}</div>
										<p className="review-date">
											Reviewed on {new Date(review.date).toLocaleDateString()}
										</p>
									</div>
								</div>
								<p className="review-body">{review.body}</p>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default SandwichModal;
