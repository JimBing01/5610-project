import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';
const ACCOUNT_URL = `${BASE_URL}/users`;


export const getUserById = async (id) => {
    const { data } = await axios.get(`${ACCOUNT_URL}/${id}`);
    return data;
}