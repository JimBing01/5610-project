import React from 'react';
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import HorizontalNavigation from '../Home/NavigationBar/index.js';
import './index.css';
import { registerUser, checkUserExists } from './client';


const API_BASE = process.env.REACT_APP_API_BASE;


function Login() {

    const navigate = useNavigate();

    // const isValidEmail = (email) => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    // };


    const onSignup = async (userData) => {
        try {
            // First, check if the email already exists
            const emailExists = await checkUserExists(userData.email);
            console.log(`Does email exist? ${emailExists}`);
            if (emailExists) {
                alert("An account with this email already exists. Please log in.");
                return;
            }

            // Register the user
            const response = await registerUser(userData);
            if (response._id) { // Assuming the response will contain the user's _id
                alert("Signup successful!");
                navigate(`/user/${response._id}/home`);
            }
        } catch (error) {
            alert("Signup failed: " + error.message);
        }
    };

    const handleLogin = async (email, password) => {
        const normalizedEmail = email.trim().toLowerCase();
        // const API_BASE = process.env.REACT_APP_API_BASE;

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
                case 'customer':
                    navigate(`/user/${user._id}/home`);
                    break;
                case 'merchant':
                    navigate(`/restaurant/${user._id}/...`); // Add the appropriate endpoint after the ID
                    break;
                case 'delivery':
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
                {/*<Route path="/signup" element={<SignupForm onSignup={handleSignup} />} />*/}
                <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                <Route path="/signup" element={<SignupForm onSignup={onSignup} />} />
            </Routes>
        </div>
    );
}

export default Login;
