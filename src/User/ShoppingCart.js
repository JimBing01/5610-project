import React, { useState } from 'react';
import './ShoppingCart.css';

function ShoppingCart() {
  const [items, setItems] = useState([
    { id: 1, name: 'Organic Salad Mix', price: 5.99, quantity: 1 },
    { id: 2, name: 'Fresh Avocado', price: 1.99, quantity: 2 },
    { id: 3, name: 'Artisan Bread', price: 2.99, quantity: 1 },
    // ... other items
  ]);

  const removeItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    setItems(items.map(item => item.id === itemId ? { ...item, quantity } : item));
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="ShoppingCart">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        {items.map(item => (
          <div className="cart-item" key={item.id}>
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
            </div>
            <div className="item-quantity">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                min="1"
              />
            </div>
            <button className="remove-item" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${calculateTotal()}</h3>
        <button className="checkout-button">Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default ShoppingCart;
