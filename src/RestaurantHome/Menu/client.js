import axios from "axios";

const API_BASE = process.env.REACT_APP_BASE_API_URL;
const USER_URL = `${API_BASE}/home`;

export const findSandwiches = async (sandwichKind) => {
    const response = await axios
        .get(`${USER_URL}`, { params: { sandwichKind:sandwichKind } });

    return response.data;
};

export const createSandwich = async (sandwich,activeMenu) => {
  /*  const data = new FormData()
    data.append('file',sandwich.image)
    data.append('sandwich',JSON.stringify(sandwich))
    data.append('activeMenu',activeMenu)
*/

    const response = await axios
        .post(`${USER_URL}`, {sandwich:sandwich,activeMenu:activeMenu});


    return response.data;
};

export const updateSandwich = async (sandwich,activeMenu) => {
    const response = await axios
        .put(`${USER_URL}`, {sandwich:sandwich,activeMenu:activeMenu});

    return response.data;
};

export const deleteSandwich = async (sandwichId,activeMenu) => {
    const response = await axios
        .delete(`${USER_URL}`, {params:{sandwichId:sandwichId,activeMenu:activeMenu}});

    return response.data;
};
