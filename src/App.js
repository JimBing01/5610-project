import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from "./Home";
import User from "./User";
import Login from "./Login";
import Menu from "./Home/Menu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/user/*" element={<User />} />
          <Route path="/login/*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;