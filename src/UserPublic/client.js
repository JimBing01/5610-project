import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api';
const ACCOUNT_URL = `${BASE_URL}/users`;
const ADDRESSES_URL = `${BASE_URL}/addresses`;
const PAYMENTS_URL = `${BASE_URL}/payments`;

export const getUserById = async (id) => {
    const { data } = await axios.get(`${ACCOUNT_URL}/${id}`);
    return data;
}
