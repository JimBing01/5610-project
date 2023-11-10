import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import './index.css';

function Home() {
    return (
        <div>
            <h1>Welcome to Wollaston's Sandwiches Delivery Service</h1>
            <nav>
                <Link to="/signup">Sign Up</Link> | <Link to="/login">Login</Link>
            </nav>
        </div>
    );
}

function Login() {
    const handleSignup = (email, password, role) => {
        // Handle the signup logic here, like sending data to the backend.
        console.log(email, password, role);
    };

    const handleLogin = (email, password) => {
        // Handle the login logic here, like sending data to the backend.
        console.log(email, password);
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="signup" element={<SignupForm onSignup={handleSignup} />} />
                    <Route path="login" element={<LoginForm onLogin={handleLogin} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default Login;
