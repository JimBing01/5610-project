import axios from "axios";

const API_BASE = process.env.REACT_APP_BASE_API_URL;
const USER_URL = `${API_BASE}`;


export const addShoppingCart = async (userId,item) => {
    const response = await axios
        .post(`${USER_URL}/home/${userId}/sandwichModal`,item);

    return response.data;
};


