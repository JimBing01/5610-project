import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';
const SANDWICHES_URL = `${API_BASE}/sandwiches`;

export const fetchSandwiches = async () => {
    try {
        const response = await axios.get(`${SANDWICHES_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sandwiches:', error);
        return [];
    }
};

export const fetchBreakfastSandwiches = async () => {
    try {
        const response = await axios.get(`${SANDWICHES_URL}/breakfast`);
        return response.data;
    } catch (error) {
        console.error('Error fetching breakfast sandwiches:', error);
        return [];
    }
};

export const fetchPopularItems = async () => {
    try {
        const response = await axios.get(`${SANDWICHES_URL}/popular`);
        return response.data;
    } catch (error) {
        console.error('Error fetching popular items:', error);
        return [];
    }
};

export const fetchSandwichesAndSubs = async () => {
    try {
        const response = await axios.get(`${SANDWICHES_URL}/subs`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sandwiches and subs:', error);
        return [];
    }
};