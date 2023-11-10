import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home";
import User from "./User";
import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/*" element={<User />} />
        {/* ... other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;