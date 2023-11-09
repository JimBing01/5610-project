import React, { useState, useEffect } from 'react';
import './accountInfo.css';

function AccountInfo() {
  const [userInfo, setUserInfo] = useState({
    firstName: 'Tom',
    lastName: 'Brady',
    email: 'tom@hotmail.com',
    phoneNumber: '121-232-1987',
  });

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
    <div className="AccountInfo"> {/* This class should match the one in your CSS file */}
      <h2>Account Information</h2>
      <p><strong>First Name:</strong> {userInfo.firstName}</p>
      <p><strong>Last Name:</strong> {userInfo.lastName}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <p><strong>Phone Number:</strong> {userInfo.phoneNumber}</p>
    </div>
  );
}

export default AccountInfo;
