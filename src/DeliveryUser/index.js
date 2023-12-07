import React from 'react';
import {Routes, Route, useParams} from 'react-router-dom';
import AccountInfo from './AccountInfo';
import PaymentMethods from './PaymentMethods';
import Addresses from './Addresses';

import SideBar from './SideBar';
import './index.css';
import Customer from "../Order/Customer";
import NavigationBar from "../Home/NavigationBar";
import DeliveryOrder from "../Order/Delivery";

function Delivery() {
    return (
      <div className="user">
        <NavigationBar/>
        <SideBar/>

        <div className="MainContent">
          <Routes>
            <Route path="account-info" element={<AccountInfo />} />
            <Route path="payment-methods" element={<PaymentMethods />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="orders" element={<DeliveryOrder />} />
          </Routes>
        </div>
      </div>
    );
  }
  
  export default Delivery;
