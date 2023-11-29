import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home";
import User from "./User";
import Login from "./Login";
import Menu from "./Home/Menu";
import Customer from "./Order/Customer";
import Delivery from "./Order/Delivery";
import Restaurant from "./Order/Restaurant";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/user/*" element={<User />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/customer"         element={<Customer/>}/>
        <Route path="/delivery"         element={<Delivery/>}/>
        <Route path="/restaurant"         element={<Restaurant/>}/>
      </Routes>
    </Router>
  );
}

export default App;