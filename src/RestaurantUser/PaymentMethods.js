import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PaymentMethods.css';
import * as client from './client';
import Form from 'react-bootstrap/Form';

function PaymentMethods() {
  const { userId } = useParams();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [editModeIndex, setEditModeIndex] = useState(null);
  const [tempCard, setTempCard] = useState({});
  const [newCard, setNewCard] = useState({ type: '', cardNumber: '', expirationDate: '', securityCode: '', isDefault: false });

  const fetchUserPaymentMethods = async () => {
    const data = await client.getUserPaymentMethods(userId);
    setPaymentMethods(data);
  };

  useEffect(() => {
    fetchUserPaymentMethods();
  }, [userId]);

  const toggleEditMode = (index) => {
    setEditModeIndex(index);
    setTempCard({ ...paymentMethods[index] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempCard({ ...tempCard, [name]: value });
  };

  const handleSave = async (index) => {
    await client.updateUserPaymentMethod(paymentMethods[index].pid, tempCard);
    fetchUserPaymentMethods();
    setEditModeIndex(null);
  };

  const handleCancel = () => {
    setEditModeIndex(null);
  };

  const handleDelete = async (pid) => {
    await client.deleteUserPaymentMethod(pid);
    fetchUserPaymentMethods();
  };

  const handleAddCard = async () => {
    await client.addUserPaymentMethod(userId, newCard);
    fetchUserPaymentMethods();
    setNewCard({ type: '', cardNumber: '', expirationDate: '', securityCode: '', isDefault: false });
  };

  const handleNewCardChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const CARD_TYPES = ["Visa", "MasterCard", "American Express", "Discover"];

  return (
    <div className="PaymentMethods">
      <h2>Payment Methods</h2>
      {paymentMethods.map((method, index) => (
        <div key={index}>
          {editModeIndex === index ? (
            <div>
              <Form.Select className="custom-select-edit" name="type" value={tempCard.type || ''} onChange={handleInputChange}>
                {CARD_TYPES.map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </Form.Select>
              <input type="text" name="cardNumber" value={tempCard.cardNumber || ''} onChange={handleInputChange} />
              <input type="text" name="expirationDate" value={tempCard.expirationDate || ''} onChange={handleInputChange} />
              <input type="password" name="securityCode" value={tempCard.securityCode || ''} onChange={handleInputChange} />
              <button onClick={() => handleSave(index)}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={() => handleDelete(method.pid)}>Delete</button>
            </div>
          ) : (
            <div>
              <p>{method.type}</p>
              <p>{method.cardNumber}</p>
              <p>{method.expirationDate}</p>
              {method.isDefault && <strong>Default Payment Method</strong>}
              <button onClick={() => toggleEditMode(index)}>Edit</button>
            </div>
          )}
        </div>
      ))}
      <div className="new-card">
        <h3>Add New Card</h3>
        <Form.Select className="custom-select-new" name="type" value={newCard.type} onChange={handleNewCardChange}>
          {CARD_TYPES.map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </Form.Select>
        <input type="text" name="cardNumber" value={newCard.cardNumber} placeholder="Card Number" onChange={handleNewCardChange} />
        <input type="text" name="expirationDate" value={newCard.expirationDate} placeholder="Expiration Date (MM/YY)" onChange={handleNewCardChange} />
        <input type="password" name="securityCode" value={newCard.securityCode} placeholder="Security Code" onChange={handleNewCardChange} />
        <button onClick={handleAddCard}>Add Card</button>
      </div>
    </div>
  );
}

export default PaymentMethods;