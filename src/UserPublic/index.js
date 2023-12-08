import React from 'react';
import {Routes, Route, useParams} from 'react-router-dom';
import AccountInfo from './AccountInfo';
import Header from './Header';
import SideBar from './SideBar';
import './index.css';

import NavigationBar from "../Home/NavigationBar";
import PublicCustomer from "../Order/PublicCustomer";

function User() {
    const {userId} = useParams();
    return (
      
      <div className="user">
        <NavigationBar/>
        <SideBar userId = {userId}/>

        <div className="MainContent">
          <Routes>
            <Route path="account-info" element={<AccountInfo />} />
            <Route path="orders" element={<PublicCustomer />} />
          </Routes>
        </div>
      </div>
    );
  }
  
  export default User;
