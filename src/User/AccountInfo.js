// Importing React hooks
import React, { useState, useEffect } from 'react';
import './accountInfo.css';

function AccountInfo() {
  // Initial state for user information
  const [userInfo, setUserInfo] = useState({
    firstName: 'Tom',
    lastName: 'Brady',
    email: 'tom@hotmail.com',
    phoneNumber: '121-232-1987',
  });

  // State to manage edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  
  // State to manage temporary form values
  const [tempUserInfo, setTempUserInfo] = useState({ ...userInfo });

  // Function to handle edit mode change
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setTempUserInfo({ ...userInfo });
  };

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUserInfo({ ...tempUserInfo, [name]: value });
  };

  // Function to handle the save button
  const handleSave = () => {
    setUserInfo({ ...tempUserInfo });
    setIsEditMode(false);
    // TODO: Save the updated data to the server
  };

  useEffect(() => {
    // Replace with actual API call
    async function fetchUserInfo() {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        setUserInfo({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
        });
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    }

    fetchUserInfo();
  }, []);

  return (
    <div className="AccountInfo">
      <h2>Account Information</h2>
      {isEditMode ? (
        <>
          <input type="text" name="firstName" value={tempUserInfo.firstName} onChange={handleInputChange} />
          <input type="text" name="lastName" value={tempUserInfo.lastName} onChange={handleInputChange} />
          <input type="email" name="email" value={tempUserInfo.email} onChange={handleInputChange} />
          <input type="tel" name="phoneNumber" value={tempUserInfo.phoneNumber} onChange={handleInputChange} />
          <button onClick={handleSave}>Save</button>
          <button onClick={toggleEditMode}>Cancel</button>
        </>
      ) : (
        <>
          <p><strong>First Name:</strong> {userInfo.firstName}</p>
          <p><strong>Last Name:</strong> {userInfo.lastName}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Phone Number:</strong> {userInfo.phoneNumber}</p>
          <button onClick={toggleEditMode}>Edit</button>
        </>
      )}
    </div>
  );
}

export default AccountInfo;
