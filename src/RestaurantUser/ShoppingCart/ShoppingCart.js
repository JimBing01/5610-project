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
       client.deleteShoppingCart(userId,itemId).then((status) => {
           setItems(items.filter(item => item._id !== itemId));
       });
  };

  const updateQuantity = (itemId, quantity) => {
      client.updateShoppingCart(userId,itemId,quantity).then((status) => {
          setItems(items.map(item => item._id === itemId ? { ...item, quantity } : item));
      });
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
        "status": "Notify restaurant",
        "image": items[0].image
    })
  };

    const createPastOrders = () => {

        client.addPastOrders(userId, pastOrder).then((pastOrders) => {
            setPastOrders([...pastOrders]);
            setItems([]);
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
                onChange={
                  (e) => {
                      updateQuantity(item._id, parseInt(e.target.value));
                  }
              }
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


          <button type="button" className="checkout-button"
                  data-bs-toggle="modal" data-bs-target={'#checkout'+new Date().getTime().toString()}
                  style={{marginTop:"0px"}}
                  onClick = {()=>handleCheck()}

          >
              Proceed to Checkout
          </button>

          <div className="modal fade" id={'checkout'+new Date().getTime().toString()} data-bs-backdrop="false"
               data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel"
               aria-hidden="true">
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="staticBackdropLabel">Check Out</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal"
                                  aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                          Please make sure you are ready to check out
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-secondary"
                                  data-bs-dismiss="modal">No
                          </button>
                          <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                  onClick={() => createPastOrders()}>Yes</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
