import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Addresses.css';
import * as client from './client';

function Addresses() {
  const { userId } = useParams();
  const [addresses, setAddresses] = useState([]);
  const [editModeIndex, setEditModeIndex] = useState(null);
  const [tempAddress, setTempAddress] = useState({});

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
  }, [userId]);

  const toggleEditMode = (index) => {
    setEditModeIndex(index);
    setTempAddress({ ...addresses[index] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempAddress({ ...tempAddress, [name]: value });
  };

  const handleSave = async (index) => {
    try {
      const updatedAddress = await client.updateUserAddress(userId, addresses[index].id, tempAddress);
      const updatedAddresses = [...addresses];
      updatedAddresses[index] = updatedAddress;
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error('Failed to update address:', error);
    }
    setEditModeIndex(null);
  };

  const handleCancel = () => {
    setEditModeIndex(null);
  };

  const handleDelete = async (addressId) => {
    try {
      await client.deleteUserAddress(userId, addressId);
      setAddresses(addresses.filter(address => address.id !== addressId));
    } catch (error) {
      console.error('Failed to delete address:', error);
    }
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
              <button onClick={() => handleDelete(address.id)}>Delete</button>
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
