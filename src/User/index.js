import React from 'react';
import { Routes, Route} from 'react-router-dom';
import AccountInfo from './AccountInfo';
import PaymentMethods from './PaymentMethods';
import Addresses from './Addresses';
import Orders from './Orders';
import SideBar from './SideBar';
import ShoppingCart from './ShoppingCart';
import './index.css';

function User() {
    return (
      <div className="App">
        <SideBar />
        <div className="MainContent">
          <Routes>
            <Route path="account-info/users/:userId" element={<AccountInfo />} />
            <Route path="payment-methods" element={<PaymentMethods />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="orders" element={<Orders />} />
            <Route path="shopping-cart" element={<ShoppingCart />} />
          </Routes>
        </div>
      </div>
    );
  }
  
  export default User;