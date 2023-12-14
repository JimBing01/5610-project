import axios from "axios";

const API_BASE = process.env.REACT_APP_BASE_API_URL;
const USER_URL = `${API_BASE}`;
const SANDWICHES_URL = `${API_BASE}/api/sandwiches`;
const FAV_URL = `${API_BASE}/user`;



export const fetchReviewsBySandwichId = async (sandwichId,frontSandwich) => {
    try {
        const response = await axios.get(`${SANDWICHES_URL}/${sandwichId}/reviews`,
            { params: { frontSandwich:frontSandwich } });
        return response.data;
    } catch (error) {
        console.error("Error fetching reviews:", error.response);
        // Depending on how you want to handle the error, you might return an empty array or rethrow the error
        return []; // Return an empty array if reviews can't be fetched
    }
};

/*export const updateSandwichDataBase =  (sandwichId,sandwich) => {
    try {
        axios.put(`${SANDWICHES_URL}/${sandwichId}/reviews`,
            sandwich);

    } catch (error) {
        console.error("Error fetching reviews:", error.response);
        // Depending on how you want to handle the error, you might return an empty array or rethrow the error
        return []; // Return an empty array if reviews can't be fetched
    }
};*/


// export const addShoppingCart = async (userId,item) => {
//     const response = await axios
//         .post(`${USER_URL}/home/${userId}/sandwichModal`,item);

//     return response.data;
// };
export const addShoppingCart = async (userId, item) => {
    if (!userId || !API_BASE) {
        console.error("Missing userId or API_BASE URL");
        return;
    }

    try {
        const url = `${API_BASE}/home/${userId}/sandwichModal`;
        console.log("Request URL:", url); // Log the URL to check it
        const response = await axios.post(url, item);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error adding to shopping cart:", error.response);
        throw error;
    }
};
export const fetchFavorites = async (userId) => {
    try {
        const response = await axios.get(`${FAV_URL}/${userId}/favorites`);
        return response.data;
    } catch (error) {
        console.error("Error fetching favorites:", error.response);
        return [];
    }
};

export const addFavorite = async (userId, item) => {
    if (!userId || !API_BASE) {
        console.error("Missing userId or API_BASE URL");
        return;
    }

    try {
        // Fetch the current favorites
        const currentFavorites = await fetchFavorites(userId);

        // Check if the item is already in favorites
        if (currentFavorites.some(favorite => favorite.name === item.name)) {
            console.log("Item already in favorites");
            return { message: "Item is already a favorite." }; // or handle this case as needed
        }

        // If not in favorites, proceed to add
        const url = `${FAV_URL}/${userId}/favorites`;
        const response = await axios.post(url, item);
        return response.data;
    } catch (error) {
        console.error("Error adding to favorites:", error.response);
        throw error;
    }
};


// export const fetchReviews 

