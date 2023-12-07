// import React, { useState } from 'react';
// import './LoginForm.css'; // Import the CSS file
//
// const LoginForm = ({ onLogin }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         onLogin(email, password);
//     };
import React, { useState } from 'react';
import './LoginForm.css'; // Import the CSS file
import { loginUser } from './client'; // Import loginUser function

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await loginUser(email, password);
            alert("Login successful!");
            // Redirect to account page or set state as logged in
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    };

    return (
        <div className="form-container"> {/* Apply the container class */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Yes, sign me in</button>
            </form>
        </div>
    );
};

export default LoginForm;
