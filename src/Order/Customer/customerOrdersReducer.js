import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";


const initialState = {
    customerOrders: db.customerOrder,
    customerOrder: {  "date": "2023-01-10 8:39",
        "price": "134.56",
        "food": [
            [2,"Onion Rings"],[1,"Family Bundle"],[2,"Soft Drink"]
        ],
        "status": "completed",
        "star": 0,
        "comment": "" },
};


const customerOrdersSlice = createSlice({
    name: "customerOrders",
    initialState,
    reducers: {
        setCustomerOrders: (state, action) => {
            state.customerOrders = action.payload;
        },

        updateCustomerOrder: (state, action) => {
            state.customerOrders = state.customerOrders.map((customerOrder) => {
                if (customerOrder.id === action.payload.id) {
                    return action.payload;
                } else {
                    return customerOrder;
                }
            });

        },
        setCustomerOrder: (state, action) => {
            state.customerOrder = action.payload;
        },
    },
});


export const { updateCustomerOrder,setCustomerOrder,setCustomerOrders } = customerOrdersSlice.actions;

export default customerOrdersSlice.reducer;