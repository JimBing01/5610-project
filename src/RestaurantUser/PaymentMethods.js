import React, { useEffect, useState } from 'react';
import './PaymentMethods.css';
import { useParams } from 'react-router-dom';
import * as client from './client';

function PaymentMethods() {
  const { userId } = useParams();
  // Updated initial state for payment methods
  const [paymentMethods, setPaymentMethods] = useState([

  ]);

  // State to manage new card form
  const [newCard, setNewCard] = useState({
    type: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    isDefault: false,
  });

useEffect(() => {
    async function fetchUserPaymentMethods() {
      try {
        client.getUserPaymentMethods(userId).then((data) => {
          setPaymentMethods(data);
        });
      } catch (error) {
        console.error('Failed to fetch user payment methods:', error);
      }
    }

    fetchUserPaymentMethods();
  }, []);

  // Function to handle form field changes
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newPaymentMethods = [...paymentMethods];
    newPaymentMethods[index][name] = value;
    setPaymentMethods(newPaymentMethods);
  };

  // Function to add a new card
  const handleAddCard = () => {
    if (newCard.type && newCard.cardNumber && newCard.expirationDate && newCard.securityCode) {
      setPaymentMethods([...paymentMethods, { ...newCard, isDefault: false }]);
      setNewCard({ type: '', cardNumber: '', expirationDate: '', securityCode: '', isDefault: false }); // Reset the new card form
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
          <input type="text" name="cardNumber" value={method.cardNumber} placeholder="Card Number" onChange={(e) => handleInputChange(e, index)} />
          <input type="text" name="expirationDate" value={method.expirationDate} placeholder="Expiration Date (MM/YY)" onChange={(e) => handleInputChange(e, index)} />
          <input type="password" name="securityCode" value={method.securityCode} placeholder="Security Code" onChange={(e) => handleInputChange(e, index)} />
          {method.isDefault && <p className="default">(Default)</p>}
          <button onClick={() => handleSave(index)}>Save</button>
        </div>
      ))}
      <div className="AddPaymentMethod">
        <input type="text" name="type" placeholder="Card Type" value={newCard.type} onChange={(e) => setNewCard({ ...newCard, type: e.target.value })} />
        <input type="text" name="cardNumber" placeholder="Card Number" value={newCard.cardNumber} onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })} />
        <input type="text" name="expirationDate" placeholder="Expiration Date (MM/YY)" value={newCard.expirationDate} onChange={(e) => setNewCard({ ...newCard, expirationDate: e.target.value })} />
        <input type="password" name="securityCode" placeholder="Security Code" value={newCard.securityCode} onChange={(e) => setNewCard({ ...newCard, securityCode: e.target.value })} />
        <button onClick={handleAddCard}>Add Card</button>
      </div>
    </div>
  );
}

export default PaymentMethods;
