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

export const deleteUserAddress = async (id, addressId) => {
    const { data } = await axios.delete(`${ACCOUNT_URL}/${id}/addresses/${addressId}`);
    return data;
}

export const updateUserAddress = async (id, addressId, address) => {
    const { data } = await axios.put(`${ACCOUNT_URL}/${id}/addresses/${addressId}`, address);
    return data;
}

export const getUserPaymentMethods = async (id) => {
    const { data } = await axios.get(`${ACCOUNT_URL}/${id}/payments`);
    return data;
}