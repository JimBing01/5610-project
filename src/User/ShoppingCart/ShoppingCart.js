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

  const[addresses,setAddresses] = useState([])
  const[address,setAddress] = useState({})

  const[promotions,setPromotions] = useState(
      [
                    {_id:1,discount:Math.round(Math.random() * (40 - 10)) + 10},
                    {_id:2,discount:Math.round(Math.random() * (40 - 10)) + 10},
                    {_id:3,discount:Math.round(Math.random() * (40 - 10)) + 10},
      ]
  )
  const[promotion,setPromotion] = useState({_id:4,discount:0})

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
    return items.reduce((acc, item) => acc + item.price * (1-promotion.discount/100) * item.quantity, 0).toFixed(2);
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
        "address":address,
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

    const checkCartEmpty = () =>{
        if(items.length != 0 && addresses.length != 0) {
            return  <div className="modal-dialog">
                <div className="modal-content backgroundColor">
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
        } else {
            return  <div className="modal-dialog">
                <div className="modal-content backgroundColor">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Check Out</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Check you cart and address is not empty !
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                data-bs-dismiss="modal">Ok
                        </button>

                    </div>
                </div>
            </div>
        }
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

        client.findAddresses(userId)
            .then((items) =>
                setAddresses(items)
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
              <p>${(item.price * (1-promotion.discount/100)).toFixed(2)}</p>
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
                  data-bs-toggle="modal" data-bs-target={
              '#checkout'+new Date().getTime().toString()
          }
                  style={{marginTop:"0px"}}
                  onClick = {()=>
                  {
                      if(items.length == 0) {

                      }else{
                          handleCheck()
                      }

                  }
                }
          >
              Proceed to Checkout
          </button>

          <div className="modal fade" id={
              'checkout'+new Date().getTime().toString()
          } data-bs-backdrop="false"
               data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel"
               aria-hidden="true">

              {checkCartEmpty()}
          </div>


      </div>
        <div>
            <span style={{fontSize: "1.2em",
                color: "#333"}}>Please choose your promotion:</span>

            {promotions.map(item => (
                <div key={item._id} style={{marginTop: "4px"}}>
                    <input className="form-check-input" type="radio" value={item.discount}
                           name="discount" id={"radio" + item._id}

                           onClick={() => setPromotion(item)}/>

                    <label htmlFor={"radio" + item._id} style={{marginLeft: "5px", marginTop: "5px"}}>
                        {item.discount+'%off'}
                    </label>
                </div>
            ))}
        </div>

        <div style={{marginTop:"20px"}}>
            <span style={{fontSize: "1.2em",
                color: "#333"}}>Please select your address:</span>

            {addresses.map(item => (
                <div  key={item.addressId} style={{marginTop:"4px"}}>
                    <input class="form-check-input" type="radio" value= {item.street+ " " + item.city+ " "
                        + item.state + " " + item.zipCode}
                           name="radio" id={"radio" + item.addressId}

                    onClick={()=>setAddress(item.street+ " " + item.city+ " "
                            + item.state + " " + item.zipCode)}/>

                    <label htmlFor={"radio" + item.addressId} style={{marginLeft:"5px",marginTop:"5px"}}>
                        {item.street+ " " + item.city+ " "
                        + item.state + " " + item.zipCode}
                    </label>
                </div>
            ))}
        </div>


    </div>
  );
}

export default ShoppingCart;
