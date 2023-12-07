import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Addresses.css';
import * as client from './client';

function Addresses() {
  const { userId } = useParams();
  // Initial state for address information
  const [addresses, setAddresses] = useState([]);

  // State to manage edit mode for each address
  const [editModeIndex, setEditModeIndex] = useState(null);

  // State to manage temporary form values
  const [tempAddress, setTempAddress] = useState({});
  // Fetch user addresses
  useEffect(() => {
    async function fetchUserAddresses() {
      try {
        client.getUserAddresses(userId).then((data) => {
          setAddresses(data);
        });
      } catch (error) {
        console.error('Failed to fetch user addresses:', error);
      }
    }

    fetchUserAddresses();
  }, []);
  // Function to toggle edit mode on and off
  const toggleEditMode = (index) => {
    setEditModeIndex(index);
    setTempAddress({ ...addresses[index] });
  };

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempAddress({ ...tempAddress, [name]: value });
  };

  // Function to handle the save button
  const handleSave = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = { ...tempAddress };
    setAddresses(updatedAddresses);
    setEditModeIndex(null);
    // TODO: Save the updated address to the server
  };

  // Function to cancel editing
  const handleCancel = () => {
    setEditModeIndex(null);
  };

  return (
    <div className="Addresses">
      <h2>Addresses</h2>
      {addresses.map((address, index) => (
        <div key={index}>
          {editModeIndex === index ? (
            <div>
              <input type="text" name="street" value={tempAddress.street} onChange={handleInputChange} />
              <input type="text" name="city" value={tempAddress.city} onChange={handleInputChange} />
              <input type="text" name="state" value={tempAddress.state} onChange={handleInputChange} />
              <input type="text" name="zipCode" value={tempAddress.zipCode} onChange={handleInputChange} />
              <input type="text" name="country" value={tempAddress.country} onChange={handleInputChange} />
              <button onClick={() => handleSave(index)}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <div>
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zipCode}</p>
              <p>{address.country}</p>
              {address.isDefault && <strong>Default Address</strong>}
              <button onClick={() => toggleEditMode(index)}>Edit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Addresses;
