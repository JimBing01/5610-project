import db from "../../Database";
import {Link, useParams} from "react-router-dom";
import "./index.css";
import sandwich1 from "../../images/sandwich1.jpg"

import {useEffect, useState} from "react";
import * as client from "./client";


function Customer() {
    const {userId} = useParams()
    const [customerOrders, setCustomerOrders] = useState([]);

    const [customerOrder, setCustomerOrder] = useState({});

    const [orderDetails, setOrderDetails] = useState([]);
    const [orderDetail, setOrderDetail] = useState({
        "name": "Onion Rings",
        "star1": false,
        "star2": false,
        "star3": false,
        "star4": false,
        "star5": false,
        "comment": "hello2"
    });

    const updateOrderDetail = (m) => {
        setOrderDetails(
            orderDetails.map((o) => {
                if (o[1]._id === orderDetail._id) {
                    o[1] = orderDetail
                    return o;
                } else {
                    return o;
                }
            })
        );
        m.food = orderDetails;
        return m;
    }

    const updateCustomerOrder = () => {
        setCustomerOrders(
            customerOrders.map((m) => {
                if (m._id === customerOrder._id) {
                    return updateOrderDetail(m);
                } else {
                    return m;
                }
            })
        );
    }
    const updateOrder = async (order) => {
        await client.updatePastOrders(userId,order);
        updateCustomerOrder();
    };

    

    useEffect(() => {
        client.findPastOrders(userId)
            .then((items) =>
                setCustomerOrders(items)
            );

    }, [userId]);


    return (
        <div className="backgroundColor" >
            <div style={{marginLeft:"10px"}}>
                <span style={{fontSize:"30px",font:"Sweet-Sans-Regular"}}>Past Order</span>
                <div className="flex-row card-over-4">
                    <ul className="d-flex flex-row flex-wrap row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
                        {customerOrders.map((order) => (
                            <li style={{width:"95%",marginTop:"30px"}}>

                                <div style={{display:"inline-block",verticalAlign:"middle"}}>
                                    <img src={order.image} style={{width:"300px",height:"150px"}}></img>
                                </div>
                                <div style={{display:"inline-block",verticalAlign:"middle",marginLeft:"60px"}}>
                                    <b>Order Date</b>: <span className="font-color">{order.date}</span><br/><br/>
                                    <b>Total price</b>:<span className="font-color">{order.price}</span>$<br/>

                                    {order.food.map((food) =>(
                                        <li style={{marginTop:"10px"}}>
                                            <div className="numberSquare">
                                                <span className="number">{food[0]}</span>

                                            </div>

                                            <div style={{display:"inline-block",width:"270px"}}>
                                                <span style={{marginLeft:"10px"}}>{food[1].name}</span>
                                            </div>


                                            <button type="button" className="btn btn-warning"
                                                    data-bs-toggle="modal" data-bs-target={'#order'+order._id + food.name} data-whatever="@mdo"
                                                    style={{fontSize:"small"}} onClick={(event) => {
                                                        setOrderDetail(food[1]);
                                                        setCustomerOrder(order);
                                                        setOrderDetails(order.food)
                                                    }}>
                                                Rate and Comment
                                            </button>




                                            <div className="modal fade" id={'order' + order._id + food.name} tabIndex="-1" role="dialog"
                                                 aria-labelledby="false" aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content backgroundColor" >
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">Rate and Comment for your order</h5>
                                                            <button type="button" className="close" data-bs-dismiss="modal"
                                                                    aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <span className="give_star">Give your stars!</span>
                                                            <form>
                                                                <div className="form-group rate">
                                                                    <input type="radio" name="rate" id="rate-5"
                                                                           checked={orderDetail.star5}
                                                                           onChange={(e) => setOrderDetail({
                                                                               ...orderDetail,star1: false,star2: false,
                                                                               star3: false,star4: false,star5: true })}/>
                                                                    <label htmlFor="rate-5" className="fas fa-star"></label>

                                                                    <input type="radio" name="rate" id="rate-4"
                                                                           checked={orderDetail.star4}
                                                                           onChange={(e) => setOrderDetail({
                                                                               ...orderDetail,star1: false,star2: false,
                                                                               star3: false,star4: true,star5: false })}/>
                                                                    <label htmlFor="rate-4" className="fas fa-star"></label>

                                                                    <input type="radio" name="rate" id="rate-3"
                                                                           checked={orderDetail.star3}
                                                                           onChange={(e) => setOrderDetail({
                                                                               ...orderDetail,
                                                                               star1: false,star2: false,
                                                                               star3: true,star4: false,star5: false })}/>
                                                                    <label htmlFor="rate-3" className="fas fa-star"></label>

                                                                    <input type="radio" name="rate" id="rate-2"
                                                                           checked={orderDetail.star2}
                                                                           onChange={(e) => setOrderDetail({
                                                                               ...orderDetail,
                                                                               star1: false,star2: true,
                                                                               star3: false,star4: false,star5: false })}/>
                                                                    <label htmlFor="rate-2" className="fas fa-star"></label>

                                                                    <input type="radio" name="rate" id="rate-1"
                                                                           checked={orderDetail.star1}
                                                                           onChange={(e) => setOrderDetail({
                                                                               ...orderDetail,
                                                                               star1: true,star2: false,
                                                                               star3: false,star4: false,star5:false })}/>
                                                                    <label htmlFor="rate-1" className="fas fa-star"></label>

                                                                    <br/>
                                                                    <span></span>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="message-text"
                                                                           className="col-form-label">Comment:</label>
                                                                    <textarea value={orderDetail.comment} className="form-control" id={"message-text"}
                                                                              onChange={(e) => setOrderDetail({
                                                                                  ...orderDetail,
                                                                                  comment: e.target.value })}></textarea>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary"
                                                                    data-bs-dismiss="modal">Close
                                                            </button>
                                                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                                                    onClick={()=>{
                                                                        updateOrder(updateOrderDetail(order))}}>
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                    ))}
                                </div>

                                <div style={{display:"inline-block",verticalAlign:"middle",marginLeft:"30px"}}>
                                    Order Status:<span style={{marginLeft:"5px"}}>{order.status}</span>
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

export default Customer;