import { useHistory, useEffect, useState } from "react-router-dom";
import { renderStars } from '../utils';
import * as client from "./client";

function PastReviews({ userId }) {
    const [reviews, setReviews] = useState([]);
    const history = useHistory();

    useEffect(() => {
        client.fetchUserReviews(userId)
            .then(data => {
                setReviews(data);
            })
            .catch(error => {
                console.error('Failed to fetch reviews:', error);
                // Handle errors as needed
            });
    }, [userId]);

    const navigateToUserPublicProfile = (userId) => {
        history.push(`/user/public/${userId}`);
    };

    return (
        <div className="reviews-container">
            {reviews.map((review, index) => (
                <div key={index} className="review">
                    <div onClick={() => navigateToUserPublicProfile(review.userId)}>
                        <div className="rating">{renderStars(review.rating)}</div>
                        <p className="review-date">
                            Reviewed on {new Date(review.date).toLocaleDateString()}
                        </p>
                        <p className="review-body">{review.body}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PastReviews;
