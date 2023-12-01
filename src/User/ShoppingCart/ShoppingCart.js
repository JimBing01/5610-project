import React, {useEffect, useState} from 'react';
import db from "../../Database";
import './ShoppingCart.css';
import {useParams} from "react-router-dom";
import * as client from "./client";

function ShoppingCart() {
  const {userId} = useParams();
  const [items, setItems] = useState([]);

  const [pastOrders,setPastOrders] = useState([])
  const [pastOrder,setPastOrder] = useState({})

  const removeItem = (itemId) => {
    setItems(items.filter(item => item._id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    setItems(items.map(item => item._id === itemId ? { ...item, quantity } : item));
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheck = () => {
      setPastOrder(
        { "_id": new Date().getTime().toString(),
        "userId":userId,
        "date": getTime(),
        "price": calculateTotal(),
        "food":
            items.map(item => (
                    [item.quantity, {"_id": new Date().getTime() + item.name,
                        "name": item.name,
                        "star1": false,
                        "star2": false,
                        "star3": false,
                        "star4": false,
                        "star5": false,
                        "comment": ""}]
                )),
        "status": "completed",
        "image": items[0].image
    })
  };

    const createPastOrders = () => {

        client.addPastOrders(userId, pastOrder).then((pastOrders) => {
            setPastOrders([...pastOrders]);
            console.log(pastOrders)
        });
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

    useEffect(() => {
        client.findShoppingCart(userId)
            .then((items) =>
                setItems(items)
            );

        client.findPastOrders(userId)
            .then((items) =>
                setPastOrders(items)
            );
    }, [userId]);


    return (
    <div className="ShoppingCart">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        {items.map(item => (
          <div className="cart-item" key={item._id}>
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
            </div>
            <div className="item-quantity">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                min="1"
              />
            </div>
            <button className="remove-item" onClick={() => removeItem(item._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${calculateTotal()}</h3>
        <button className="checkout-button" onClick={()=> {
            handleCheck();
            createPastOrders();
        }}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default ShoppingCart;
