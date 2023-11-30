import React from 'react';
import {Routes, Route, useParams} from 'react-router-dom';
import AccountInfo from './AccountInfo';
import PaymentMethods from './PaymentMethods';
import Addresses from './Addresses';

import SideBar from './SideBar';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import './index.css';
import Customer from "../Order/Customer";

function User() {
    const {userId} = useParams();
    return (
      <div className="user">
        <SideBar userId = {userId}/>

        <div className="MainContent">
          <Routes>
            <Route path="account-info" element={<AccountInfo />} />
            <Route path="payment-methods" element={<PaymentMethods />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="orders" element={<Customer />} />
            <Route path="shopping-cart" element={<ShoppingCart />} />
          </Routes>
        </div>
      </div>
    );
  }
  
  export default User;
