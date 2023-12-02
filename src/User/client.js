import axios from 'axios';
const ACCOUNT_URL = 'http://localhost:4000/api/users';

export const getUserById = async (id) => {
    const { data } = await axios.get(`${ACCOUNT_URL}/${id}`);
    return data;
}

export const getUserAddresses = async (id) => {
    const { data } = await axios.get(`${ACCOUNT_URL}/${id}/addresses`);
    return data;
}