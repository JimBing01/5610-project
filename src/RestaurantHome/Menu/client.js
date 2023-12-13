import axios from "axios";

const request = axios.create({
    withCredentials: true,
});

const API_BASE = process.env.REACT_APP_API_BASE;
// REACT_APP_API_BASE=http://localhost:4000/api
const USER_URL = `${API_BASE}/home`;


console.log('API_BASE:', process.env.REACT_APP_API_BASE);
console.log('USER_URL:', `${process.env.REACT_APP_API_BASE}/home`);

export const findSandwiches = async (sandwichKind) => {
    const response = await request
        .get(`${USER_URL}`, { params: { sandwichKind:sandwichKind } });
    return response.data;
};

export const createSandwich = async (sandwich,activeMenu) => {
  /*  const data = new FormData()
    data.append('file',sandwich.image)
    data.append('sandwich',JSON.stringify(sandwich))
    data.append('activeMenu',activeMenu)
*/
    
    const response = await request
        .post(`${USER_URL}`, {sandwich:sandwich,activeMenu:activeMenu});


    return response.data;
};

export const updateSandwich = async (sandwich,activeMenu) => {
    const response = await request
        .put(`${USER_URL}`, {sandwich:sandwich,activeMenu:activeMenu});

    return response.data;
};

export const deleteSandwich = async (sandwichId,activeMenu) => {
    const response = await request
        .delete(`${USER_URL}`, {params:{sandwichId:sandwichId,activeMenu:activeMenu}});

    return response.data;
};
