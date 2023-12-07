import db from "../../Database";
import {Link, useParams} from "react-router-dom";
import "./index.css";
import sandwich1 from "../../images/sandwich1.jpg"

import React, {useEffect, useState} from "react";
import * as client from "./client";


function RestaurantOrder() {
    const {userId} = useParams()
    const [customerOrders, setCustomerOrders] = useState([]);

    const [customerOrder, setCustomerOrder] = useState({});


    const updateCustomerOrder = () => {
        setCustomerOrders(
            customerOrders.map((m) => {
                if (m._id === customerOrder._id) {
                    return customerOrder;
                } else {
                    return m;
                }
            })
        );
    }
    const updateOrder = async (order) => {
        await client.updatePastOrders(order);
        updateCustomerOrder();
    };

    useEffect(() => {
        client.findPastOrders()
            .then((items) =>
                setCustomerOrders(items)
            );

    }, []);


    return (
        <div className="backgroundColor" >
            <div style={{marginLeft:"10px"}}>
                <span style={{fontSize:"30px",font:"Sweet-Sans-Regular"}}>Past Order</span>
                <div className="flex-row card-over-4">
                    <ul className="d-flex flex-row flex-wrap row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
                        {customerOrders.map((order) => (
                            <li style={{width:"95%",marginTop:"30px"}}>

                                <div style={{display:"inline-block",verticalAlign:"middle"}}>
                                    <img src={'../..'+order.image} style={{width:"300px",height:"150px"}}></img>
                                </div>
                                <div style={{display:"inline-block",verticalAlign:"middle",marginLeft:"60px"}}>
                                    <b>Order Date</b>: <span className="font-color">{order.date}</span><br/><br/>
                                    <b>Total price</b>:<span className="font-color">{order.price}</span>$<br/>

                                    {order.food.map((food) =>(
                                        <li style={{marginTop:"10px"}}>
                                            <div className="numberSquare">
                                                <span className="number">{food[0]}</span>

                                            </div>

                                            <div style={{display:"inline-block",width:"250px"}}>
                                                <span style={{marginLeft:"10px"}}>{food[1].name}</span>
                                            </div>
                                        </li>

                                    ))}
                                </div>

                                <div style={{display:"inline-block",verticalAlign:"middle",marginLeft:"50px",width:"250px"}}>
                                    <span >Order Status:  {order.status}</span><br/><br/>
                                    <span style={{marginTop:"5px"}}>Order Address:<br/>{order.address}</span>
                                </div>

                                <button type="button" className="btn btn-warning"
                                        data-bs-toggle="modal" data-bs-target={'#modify'+new Date().getTime().toString()}
                                        style={{marginLeft:"50px"}}
                                        onClick = {()=>setCustomerOrder({...order,status:"Pick up for delivering"})}

                                >
                                    Pick up for delivering
                                </button>

                                <div className="modal fade" id={'modify'+new Date().getTime().toString()} data-bs-backdrop="false"
                                     data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel"
                                     aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabel">Notify</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                Please make sure you are ready to notify
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"
                                                        data-bs-dismiss="modal">No
                                                </button>
                                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                                        onClick={() => updateOrder(customerOrder)}>Yes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <hr className="hr-style"></hr>


                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default RestaurantOrder;