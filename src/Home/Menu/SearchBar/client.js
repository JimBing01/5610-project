import axios from "axios";
const SANDWICHES_URL = 'http://localhost:4000/api/sandwiches';

export const getSandwichByName = async (name) => {
    const { data } = await axios.get(`${SANDWICHES_URL}/${name}`);
    return data;
}