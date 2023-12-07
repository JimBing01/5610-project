import React from 'react';
import {Routes, Route, useParams} from 'react-router-dom';
import AccountInfo from './AccountInfo';
import PaymentMethods from './PaymentMethods';
import Addresses from './Addresses';
import Header from './Header';
import SideBar from './SideBar';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import './index.css';
import Customer from "../Order/Customer";
import NavigationBar from "../Home/NavigationBar";
import Restaurant from "../Order/Restaurant";

function User() {
    const {userId} = useParams();
    return (
      
      <div className="user">
        <NavigationBar/>
        <SideBar userId = {userId}/>

        <div className="MainContent">
        <h1 className="welcomeSlogan">Welcome! Dear Customer</h1> 
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
