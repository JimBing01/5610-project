import React from 'react';
import './Addresses.css';

function Addresses() {
  // Placeholder data, in a real app this would be fetched from an API
  const addresses = [
    // Assuming there are no addresses in the screenshots provided
    // Add an example address format
    {
      street: '123 Maple Street',
      city: 'Anytown',
      state: 'NY',
      zipCode: '12345',
      country: 'USA',
      isDefault: true,
    },
    // ... more addresses
  ];

  return (
    <div className="Addresses">
      <h2>Addresses</h2>
      {addresses.length > 0 ? (
        <ul>
          {addresses.map((address, index) => (
            <li key={index}>
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zipCode}</p>
              <p>{address.country}</p>
              {address.isDefault && <strong>Default Address</strong>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No addresses on file. Add a new address.</p>
      )}
    </div>
  );
}

export default Addresses;
