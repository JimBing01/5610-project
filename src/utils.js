export const renderStars = (rating) => {
    return [...Array(rating)].map((_, i) => <span key={i}>★</span>);
};
