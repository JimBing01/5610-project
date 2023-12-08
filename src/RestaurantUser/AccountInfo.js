import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './accountInfo.css';
import * as client from './client';

function AccountInfo() {
  // Get the userId from the URL parameters
  const { userId } = useParams();

  // States for user information and edit mode
  const [userInfo, setUserInfo] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempUserInfo, setTempUserInfo] = useState(null);

  // Fetch user information by ID
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        client.getUserById(userId).then((data) => {
          setUserInfo(data);
          setTempUserInfo(data);
        }
        );
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    }

    if (userId) {
      fetchUserInfo();
    }
  }, [userId]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUserInfo({ ...tempUserInfo, [name]: value });
  };

  // Handle save
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tempUserInfo),
      });
      if (response.ok) {
        setUserInfo({ ...tempUserInfo });
        setIsEditMode(false);
      }
    } catch (error) {
      console.error('Failed to save user info:', error);
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setTempUserInfo({ ...userInfo });
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="AccountInfo">
      <h2>Account Information</h2>
      {isEditMode ? (
        // Edit mode inputs
<>
  <input
    type="text"
    name="firstName"
    value={tempUserInfo.firstName}
    onChange={handleInputChange}
    placeholder="First Name"
  />
  <input
    type="text"
    name="lastName"
    value={tempUserInfo.lastName}
    onChange={handleInputChange}
    placeholder="Last Name"
  />
  <input
    type="email"
    name="email"
    value={tempUserInfo.email}
    onChange={handleInputChange}
    placeholder="Email"
  />
  <input
    type="tel"
    name="phone"
    value={tempUserInfo.phone}
    onChange={handleInputChange}
    placeholder="Phone Number"
  />
  <button onClick={handleSave}>Save</button>
  <button onClick={toggleEditMode}>Cancel</button>
</>

      ) : (
        // Display user info
<>
  <p><strong>First Name:</strong> {userInfo.firstName}</p>
  <p><strong>Last Name:</strong> {userInfo.lastName}</p>
  <p><strong>Email:</strong> {userInfo.email}</p>
  <p><strong>Phone Number:</strong> {userInfo.phone}</p>
  <button onClick={toggleEditMode}>Edit</button>
</>

      )}
    </div>
  );
}

export default AccountInfo;
