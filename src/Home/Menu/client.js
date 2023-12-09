import axios from "axios";

const SANDWICHES_URL = "http://localhost:4000/api/sandwiches";

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