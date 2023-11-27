import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import './index.css';
import HorizontalNavigation from '../Home/NavigationBar/index.js';


// if (localStorage.getItem('users') === null) {
//     localStorage.setItem('users', JSON.stringify([
//                                                      {
//                                                          "email": "yiming@163.com",
//                                                          "password": "123456789",
//                                                          "role": "customer"
//                                                      },
//                                                      {
//                                                          "email": "johnnydepp@gmail.com",
//                                                          "password": "bequickman",
//                                                          "role": "delivery person"
//                                                      },
//                                                      {
//                                                          "email": "bestsandwich@outlook.com",
//                                                          "password": "iwanttoeat",
//                                                          "role": "merchant"
//                                                      }
//                                                  ]));
// }

function Login() {
    // const handleSignup = (email, password, role) => {
    //     console.log(email, password, role);
    // };
    //
    // const handleLogin = (email, password) => {
    //     console.log(email, password);
    // };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const doesEmailExist = (email) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.some(user => user.email === email);
    };

    const addUserToDatabase = (email, password, role) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ email, password, role });
        localStorage.setItem('users', JSON.stringify(users));
    };

    // const handleSignup = (email, password, confirmPassword, role) => {
    //     if (!isValidEmail(email)) {
    //         alert("Please enter a valid email address.");
    //         return;
    //     }
    //     if (doesEmailExist(email)) {
    //         alert("An account with this email already exists. Please log in.");
    //         return;
    //     }
    //     if (password !== confirmPassword) {
    //         alert("Passwords don't match.");
    //         return;
    //     }
    //     addUserToDatabase(email, password, role);
    //     alert("Signup successful!");
    // };

    const handleSignup = async (email, password, confirmPassword, role) => {
        if (!isValidEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Check if email already exists (this will now be a request to your server)
        const response = await fetch(`http://localhost:4000/api/users?email=${email}`);
        const usersWithSameEmail = await response.json();

        if (usersWithSameEmail.length > 0) {
            alert("An account with this email already exists. Please log in.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }

        // Send a request to the server to create a new user
        const createUserResponse = await fetch('http://localhost:4000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, role })
        });

        if (createUserResponse.ok) {
            alert("Signup successful!");
        } else {
            alert("Signup failed. Please try again.");
        }
    };


    // const handleLogin = (email, password) => {
    //     // const users = JSON.parse(localStorage.getItem('users')) || [];
    //     // const user = users.find(user => user.email === email && user.password === password);
    //     // Trim and normalize email input for consistent matching
    //
    //     const normalizedEmail = email.trim().toLowerCase();
    //     const users = JSON.parse(localStorage.getItem('users')) || [];
    //
    //     // Find a user where the email and password match
    //     const user = users.find(user =>
    //                                 user.email.toLowerCase() === normalizedEmail && user.password === password
    //     );
    //
    //     if (user) {
    //         alert("Login successful!");
    //     } else {
    //         alert("Incorrect email or password. Please try again.");
    //     }
    // };

    const handleLogin = async (email, password) => {
        const normalizedEmail = email.trim().toLowerCase();

        // Fetch all users from the server (ideally, you would have a more secure endpoint for login)
        const response = await fetch('http://localhost:4000/api/users');
        const users = await response.json();

        // Find a user where the email and password match
        const user = users.find(user =>
                                    user.email.toLowerCase() === normalizedEmail && user.password === password
        );

        if (user) {
            alert("Login successful!");
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
                <Link to="/login/signup" className="link-sign-up">Don't have an account? Sign up now</Link>
            </div>
            <Routes>
                <Route path="/signup" element={<SignupForm onSignup={handleSignup} />} />
                <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                //rendering:  LJSX that represents the LoginForm component
            </Routes>
        </div>
    );
}

export default Login;
