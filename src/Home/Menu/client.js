import axios from "axios";

const request = axios.create({
    withCredentials: true,
  });
  

const API_BASE = process.env.REACT_APP_API_BASE;

const SANDWICHES_URL = `${API_BASE}/sandwiches`;


export const fetchBreakfastSandwiches = async () => {
    try {
        const response = await request.get(`${SANDWICHES_URL}/breakfast`);
        return response.data;
    } catch (error) {
        console.error('Error fetching breakfast sandwiches:', error);
        return [];
    }
};

export const fetchPopularItems = async () => {
    try {
        const response = await request.get(`${SANDWICHES_URL}/popular`);
        return response.data;
    } catch (error) {
        console.error('Error fetching popular items:', error);
        return [];
    }
};

export const fetchSandwichesAndSubs = async () => {
    try {
        const response = await request.get(`${SANDWICHES_URL}/subs`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sandwiches and subs:', error);
        return [];
    }
};