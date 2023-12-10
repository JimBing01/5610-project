import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;
const ACCOUNT_URL = `${API_BASE}/users`;
const ADDRESSES_URL = `${API_BASE}/addresses`;
const PAYMENTS_URL = `${API_BASE}/payments`;

export const getUserById = async (id) => {
    const { data } = await axios.get(`${ACCOUNT_URL}/${id}`);
    return data;
};

export const fetchUserReviews = async (userId) => {
    try {
        const response = await axios.get(`/api/users/public/${userId}/reviews`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user reviews:', error);
        return []; // Return an empty array in case of an error
    }
}

