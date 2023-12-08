import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';
const ACCOUNT_URL = `${BASE_URL}/users`;
const ADDRESSES_URL = `${BASE_URL}/addresses`;
const PAYMENTS_URL = `${BASE_URL}/payments`;

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

