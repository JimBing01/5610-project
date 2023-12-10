import React from 'react';
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import HorizontalNavigation from '../Home/NavigationBar/index.js';
import './index.css';
import { registerUser, checkUserExists } from './client';


function Login() {

    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    const handleSignup = async (email, password, confirmPassword, role) => {
        if (!isValidEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            const emailExists = await checkUserExists(email);
            // console.log(`Does email exist? ${emailExists}`);
            if (emailExists) {
                alert("An account with this email already exists. Please log in.");
                return;
            }

            // console.log('Password:', password);
            // console.log('Confirm Password:', confirmPassword);
            if (password.trim() !== confirmPassword.trim()) {
                alert("Passwords don't match.");
                return;
            }

            await registerUser(email, password, role);
            alert("Signup successful!");
        } catch (error) {
            alert("Signup failed: " + error.message);
        }
    };


    const handleLogin = async (email, password) => {
        const normalizedEmail = email.trim().toLowerCase();
        const API_BASE = process.env.REACT_APP_API_BASE;

        // Fetch all users from the server (ideally, you would have a more secure endpoint for login)
        const response = await fetch(`${API_BASE}/users`);
        const users = await response.json();

        // Find a user where the email and password match
        const user = users.find(user =>
                                    user.email.toLowerCase() === normalizedEmail && user.password === password
        );

        if (user) {
            alert("Login successful!");

            // Redirect based on user role
            switch (user.role) {
                case 'CUSTOMER':
                    navigate(`/user/${user._id}/home`);
                    break;
                case 'MERCHANT':
                    navigate(`/restaurant/${user._id}/...`); // Add the appropriate endpoint after the ID
                    break;
                case 'DELIVERY':
                    navigate(`/delivery/${user._id}/...`); // Add the appropriate endpoint after the ID
                    break;
                default:
                    // Handle unknown role or redirect to a general page
                    navigate('/'); // Redirect to home or another default route
            }
        } else {
            alert("Incorrect email or password. Please try again.");
        }
    };


    return (
        <div className="App">
            <HorizontalNavigation />
            <div className="main-content">
                <h1>Welcome to Wollaston's!</h1>
                <Link to="/login/login" className="button-sign-in">Log in</Link>
                <Link to="/login/signup" className="link-sign-up">Don't have an account? Register now</Link>
            </div>
            <Routes>
                <Route path="/signup" element={<SignupForm onSignup={handleSignup} />} />
                <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            </Routes>
        </div>
    );
}

export default Login;
