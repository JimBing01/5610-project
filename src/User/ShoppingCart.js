import React, {useEffect, useState} from 'react';
import db from "../Database";
import './ShoppingCart.css';
import {useParams} from "react-router-dom";

function ShoppingCart() {
  const {userId} = useParams();
  const [items, setItems] = useState(db.shoppingCart.filter(a => a.userId === userId));
  const [pastOrders,setPastOrders] = useState(db.customerOrder)
  const [pastOrder,setPastOrder] = useState({})
  const user = db.users.find(a => a._id === userId)

  const removeItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    setItems(items.map(item => item.id === itemId ? { ...item, quantity } : item));
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };


  const handleCheck = () => {
      setPastOrder(
        { "_id": new Date().getTime().toString(),
        "userName": user.userName,
        "date": getTime(),
        "price": calculateTotal(),
        "food": [
            items.map(item => (
                    [item.quantity, {"_id": new Date().getTime(),
                        "name": item.name,
                        "star1": false,
                        "star2": false,
                        "star3": false,
                        "star4": false,
                        "star5": false,
                        "comment": ""}]
                ))
        ],
        "status": "completed",
        "image": items[0].image
    })

    setPastOrders([...pastOrders,pastOrder])
  };


    const getTime = () =>{
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth()+1;
        var day = time.getDate();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();
        return year+'-'+(month<10?'0'+month:month)+'-'+(day<10?'0'+day:day)+' '+(hour<10?'0'+hour:hour)+':'+(minute<10?'0'+minute:minute)+':'+(second<10?'0'+second:second)
    }



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
        <button className="checkout-button" onClick={()=>handleCheck()}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default ShoppingCart;
