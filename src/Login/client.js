// src/Login/client.js

const API_BASE_URL = process.env.REACT_APP_BASE_API_URL;
// const API_BASE = process.env.REACT_APP_API_BASE;

export async function registerUser(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
            credentials: 'include'
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
        const response = await fetch(`${API_BASE_URL}/api/users?email=${encodeURIComponent(email)}`, {
            credentials: 'include'
        });
        console.log('Response from checkUserExists:', response);

        if (!response.ok) {
            throw new Error(`Failed to check if user exists: ${response.statusText}`);
        }

        const users = await response.json();
        console.log('Data returned:', users);

        // Assuming the server returns an array of users, check if any users were returned
        return users.length > 0;
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw error;
    }
}

