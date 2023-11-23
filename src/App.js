import React from 'react';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Home from "./Home";
import User from "./User";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/*" element={<User />} />
          <Route path="/login/*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;