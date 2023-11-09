import React from 'react';
import './Orders.css';

function Orders() {
  // Placeholder data, in a real app this would be fetched from an API
  const orders = [
    {
      date: '10/23/23',
      type: 'Pickup',
      location: 'Ink Block',
      items: [
        {
          name: 'Custom Chicken Pesto Parm',
          price: 14.39,
        },
      ],
      total: 14.39,
    },
    {
      date: '7/23/23',
      type: 'Pickup',
      location: 'Ink Block',
      items: [
        {
          name: 'Create Your Own',
          price: 32.80,
        },
      ],
      total: 32.80,
    },
    {
      date: '6/25/23',
      type: 'Pickup',
      location: 'Ink Block',
      items: [
        {
          name: 'Create Your Own',
          price: 16.00,
        },
      ],
      total: 16.00,
    },
    // ... more orders
  ];

  return (
    <div className="Orders">
      <h2>Past Orders</h2>
      {orders.length > 0 ? (
        <div>
          {orders.map((order, index) => (
            <div key={index} className="order">
              <h3>Order from {order.date}</h3>
              <p>Type: {order.type}</p>
              <p>Location: {order.location}</p>
              <ul>
                {order.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item.name} - ${item.price.toFixed(2)}</li>
                ))}
              </ul>
              <p>Total: ${order.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>You have not placed any orders yet.</p>
      )}
    </div>
  );
}

export default Orders;
