// src/Login/client.js

const API_BASE_URL = 'http://localhost:4000'; // Replace with your server's URL

export async function registerUser(email, password, role) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/signup`, {
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

export async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Failed to login user');
        }

        return response.json();
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}

