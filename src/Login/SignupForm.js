import React, { useState } from 'react';
import './SignupForm.css'; // Import the CSS file

const SignupForm = ({ onSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        onSignup(email, password, role);
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
                <div>
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="role-selection">
                    <label>Role:</label>
                    <div className="role-options" onChange={(e) => setRole(e.target.value)}>
                        <input type="radio" value="customer" name="role" required /> Customer
                        <input type="radio" value="merchant" name="role" required /> Merchant
                        <input type="radio" value="delivery" name="role" required /> Delivery Person
                    </div>
                </div>
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
};

export default SignupForm;
