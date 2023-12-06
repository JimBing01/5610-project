import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Addresses.css';
import * as client from './client';

function Addresses() {
  const { userId } = useParams();
  const [addresses, setAddresses] = useState([]);
  const [editModeIndex, setEditModeIndex] = useState(null);
  const [tempAddress, setTempAddress] = useState({});
  const [newAddress, setNewAddress] = useState({ street: '', city: '', state: '', zipCode: '', country: '' });

  const fetchUserAddresses = async () => {
    const data = await client.getUserAddresses(userId);
    setAddresses(data);
  };

  useEffect(() => {
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
    await client.updateUserAddress(addresses[index].addressId, tempAddress);
    fetchUserAddresses(); // Refetch addresses to update the list
    setEditModeIndex(null);
  };

  const handleCancel = () => {
    setEditModeIndex(null);
  };

  const handleDelete = async (addressId) => {
    await client.deleteUserAddress(addressId);
    fetchUserAddresses(); // Refetch addresses to update the list
  };

  const handleAddAddress = async () => {
    await client.addUserAddress(userId, newAddress);
    fetchUserAddresses(); // Refetch addresses to update the list
    setNewAddress({ street: '', city: '', state: '', zipCode: '', country: '' }); // Reset new address fields
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  return (
    <div className="Addresses">
      <h2>Addresses</h2>
      {addresses.map((address, index) => (
        <div key={index}>
          {editModeIndex === index ? (
            <div>
              <input type="text" name="street" value={tempAddress.street || ''} onChange={handleInputChange} />
              <input type="text" name="city" value={tempAddress.city || ''} onChange={handleInputChange} />
              <input type="text" name="state" value={tempAddress.state || ''} onChange={handleInputChange} />
              <input type="text" name="zipCode" value={tempAddress.zipCode || ''} onChange={handleInputChange} />
              <input type="text" name="country" value={tempAddress.country || ''} onChange={handleInputChange} />
              <button onClick={() => handleSave(index)}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={() => handleDelete(address.addressId)}>Delete</button>
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
            <div className="new-address">
        <h3>Add New Address</h3>
        <input type="text" name="street" value={newAddress.street} placeholder="Street" onChange={handleNewAddressChange} />
        <input type="text" name="city" value={newAddress.city} placeholder="City" onChange={handleNewAddressChange} />
        <input type="text" name="state" value={newAddress.state} placeholder="State" onChange={handleNewAddressChange} />
        <input type="text" name="zipCode" value={newAddress.zipCode} placeholder="Zip Code" onChange={handleNewAddressChange} />
        <input type="text" name="country" value={newAddress.country} placeholder="Country" onChange={handleNewAddressChange} />
        <button onClick={handleAddAddress}>Add Address</button>
      </div>
    </div>
  );
}

export default Addresses;
