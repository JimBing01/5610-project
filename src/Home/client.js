import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE;
const ACCOUNT_URL = `${BASE_URL}/users`;


export const getUserById = async (id) => {
    const { data } = await axios.get(`${ACCOUNT_URL}/${id}`);
    return data;
}