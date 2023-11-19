import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import './index.css';

function Login() {
    const handleSignup = (email, password, role) => {
        console.log(email, password, role);
    };

    const handleLogin = (email, password) => {
        console.log(email, password);
    };

    return (
        <div className="App">
            <nav>
                <span>HOME</span>
                <span>ACCOUNT</span>
            </nav>
            <div className="main-content">
                <h1>Welcome to Wollaston's!</h1>
                <Link to="/login/login" className="button-sign-in">Log in</Link>
                <Link to="/login/signup" className="link-sign-up">Don't have an account? Sign up now</Link>
            </div>
            <Routes>
                <Route path="/signup" element={<SignupForm onSignup={handleSignup} />} />
                <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            </Routes>
        </div>
    );
}

export default Login;
