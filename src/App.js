import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from "./Home";
import User from "./User";
import Login from "./Login";
import Menu from "./Home/Menu";
import Customer from "./Order/Customer";

import Restaurant from "./RestaurantUser";
import Delivery from "./DeliveryUser";

import RestaurantHome from "./RestaurantHome";
import UserPublic from "./UserPublic";
import ApiSearchBar from "./Home/NavigationBar/ApiSearchBar"
import SearchResults from "./Home/NavigationBar/ApiSearchBar/SearchResults"



function App() {
  return (

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/home/user/:userId" element={<Home />} />
          <Route path="/home/restaurant/:userId" element={<RestaurantHome />} />
          <Route path="/home/delivery/:userId" element={<Home />} />
          <Route path="/home/:role" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/user/:userId/*" element={<User />} />
          <Route path="/restaurant/:userId/*" element={<Restaurant />} />
          <Route path="/delivery/:userId/*" element={<Delivery />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/user/public/:userId/:pre/*" element={<UserPublic />} />
          <Route path="/restaurant/public/:userId/:pre/*" element={<UserPublic />} />
          <Route path="/delivery/public/:userId/:pre/*" element={<UserPublic />} />

          <Route path="/search" element={<><ApiSearchBar /><SearchResults /></>} />
          <Route path="/search/:criteria" element={<><ApiSearchBar /><SearchResults /></>} />
        </Routes>
      </Router>

  );
}

export default App;