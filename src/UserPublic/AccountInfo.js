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


  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="AccountInfo">
      <h2>Account Information</h2>
        <>
          <p><strong>First Name:</strong> {userInfo.firstName}</p>
          <p><strong>Last Name:</strong> {userInfo.lastName}</p>
        </>
    </div>
  );
}

export default AccountInfo;
