import React from 'react';
import './PaymentMethods.css';

function PaymentMethods() {
  // Placeholder data, in a real app this would be fetched from an API
  const paymentMethods = [
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
  ];

  return (
    <div className="PaymentMethods"> {/* Apply the main class */}
      <h2>Payment Methods</h2>
      {paymentMethods.map((method, index) => (
        <div key={index} className="PaymentMethod"> {/* Apply class to each payment method */}
          <p>{method.type} ending in {method.lastFourDigits}</p>
          {method.isDefault && <p className="default">(Default)</p>}
        </div>
      ))}
    </div>
  );
}


export default PaymentMethods;
