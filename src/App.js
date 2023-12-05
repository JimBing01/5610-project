import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home";
import User from "./User";
import Login from "./Login";
import Menu from "./Home/Menu";
import Customer from "./Order/Customer";
import Delivery from "./Order/Delivery";
import Restaurant from "./Restaurant";



function App() {
  return (

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/:role/:userId" element={<Home />} />
          <Route path="/home/:role" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/user/:userId/*" element={<User />} />
          <Route path="/restaurant/:userId/*" element={<Restaurant />} />
          <Route path="/login/*" element={<Login />} />
        </Routes>
      </Router>

  );
}

export default App;