import React, { useState } from 'react';
import './PaymentMethods.css';

function PaymentMethods() {
  // Initial state for payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      type: 'Visa',
      lastFourDigits: '6735',
      isDefault: true,
    },
    {
      type: 'Visa',
      lastFourDigits: '1897',
      isDefault: false,
    },
    {
      type: 'Visa',
      lastFourDigits: '3266',
      isDefault: false,
    },
  ]);

  // State to manage new card form
  const [newCard, setNewCard] = useState({
    type: '',
    lastFourDigits: '',
    isDefault: false,
  });

  // Function to handle form field changes
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newPaymentMethods = [...paymentMethods];
    newPaymentMethods[index][name] = value;
    setPaymentMethods(newPaymentMethods);
  };

  // Function to add a new card
  const handleAddCard = () => {
    if (newCard.type && newCard.lastFourDigits) {
      setPaymentMethods([...paymentMethods, { ...newCard, isDefault: false }]);
      setNewCard({ type: '', lastFourDigits: '', isDefault: false }); // Reset the new card form
    }
  };

  // Function to handle saving the edited card
  const handleSave = (index) => {
    // TODO: Save the updated card information to the server
  };

  return (
    <div className="PaymentMethods">
      <h2>Payment Methods</h2>
      {paymentMethods.map((method, index) => (
        <div key={index} className="PaymentMethod">
          <input type="text" name="type" value={method.type} onChange={(e) => handleInputChange(e, index)} />
          <input type="text" name="lastFourDigits" value={method.lastFourDigits} onChange={(e) => handleInputChange(e, index)} />
          {method.isDefault && <p className="default">(Default)</p>}
          <button onClick={() => handleSave(index)}>Save</button>
        </div>
      ))}
      <div className="AddPaymentMethod">
        <input type="text" name="type" placeholder="Card Type" value={newCard.type} onChange={(e) => setNewCard({ ...newCard, type: e.target.value })} />
        <input type="text" name="lastFourDigits" placeholder="Last 4 Digits" value={newCard.lastFourDigits} onChange={(e) => setNewCard({ ...newCard, lastFourDigits: e.target.value })} />
        <button onClick={handleAddCard}>Add Card</button>
      </div>
    </div>
  );
}

export default PaymentMethods;
