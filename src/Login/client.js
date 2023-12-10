// src/Login/client.js

const API_BASE_URL = process.env.REACT_APP_BASE_API_URL || 'http://localhost:4000';

export async function registerUser(email, password, role) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, role })
        });

        if (!response.ok) {
            throw new Error('Failed to register user');
        }

        return response.json();
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

export async function checkUserExists(email) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users?email=${email}`);
        // console.log('Response from checkUserExists:', response); // Debugging line
        if (!response.ok) {
            throw new Error('Failed to check if user exists');
        }
        const users = await response.json();
        // console.log('Users with the same email:', users); // Debugging line
        return users.length > 0;
    } catch (error) {
        // console.error('Error checking user existence:', error);
        throw error;
    }
}

