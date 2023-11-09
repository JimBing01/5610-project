import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AccountInfo from './AccountInfo';
import PaymentMethods from './PaymentMethods';
import Addresses from './Addresses';
import Orders from './Orders';
import SideBar from './SideBar';
import './index.css';

function User() {
    return (
      <div className="App">
        <SideBar /> {/* Directly use SideBar component without wrapping ul */}
        <div className="MainContent">
          <Routes>
            <Route path="account-info" element={<AccountInfo />} />
            <Route path="payment-methods" element={<PaymentMethods />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    );
  }
  
  export default User;
