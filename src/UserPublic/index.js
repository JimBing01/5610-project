import React from 'react';
import {Routes, Route, useParams} from 'react-router-dom';
import AccountInfo from './AccountInfo';
import Header from './Header';
import SideBar from './SideBar';
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
          <Routes>
            <Route path="account-info" element={<AccountInfo />} />
            <Route path="orders" element={<Customer />} />
          </Routes>
        </div>
      </div>
    );
  }
  
  export default User;
