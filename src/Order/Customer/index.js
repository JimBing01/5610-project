import db from "../../Database";
import {Link, useParams} from "react-router-dom";
import "./index.css";
import sandwich1 from "../../images/sandwich1.jpg"

import {useState} from "react";

function Customer() {
    const [customerOrders, setCustomerOrders] = useState(db.customerOrder);
    const [customerOrder, setCustomerOrder] = useState({
        "date": "2023-01-10 8:39",
        "price": "134.56",
        "food": [
            [2,"Onion Rings"],[1,"Family Bundle"],[2,"Soft Drink"]
        ],
        "status": "completed",
        "star1": true,
        "star2": true,
        "star3": true,
        "star4": true,
        "star5": false,
        "comment": ""
    });

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


    return (
        <div className="backgroundColor" >
            <div style={{marginLeft:"10px"}}>
                <span style={{fontSize:"30px",font:"Sweet-Sans-Regular"}}>Past Order</span>
                <div className="flex-row card-over-4">
                    <ul className="d-flex flex-row flex-wrap row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
                        {customerOrders.map((order) => (
                            <li style={{width:"95%",marginTop:"30px"}}>

                                <div style={{display:"inline-block",verticalAlign:"middle"}}>
                                    <img src={sandwich1} style={{width:"300px",height:"150px"}}></img>
                                </div>
                                <div style={{display:"inline-block",verticalAlign:"middle",marginLeft:"60px"}}>
                                    <b>Order Date</b>: <span className="font-color">{order.date}</span><br/>
                                    <b>Total price</b>:<span className="font-color">{order.price}</span>$<br/>

                                    {order.food.map((food) =>(
                                        <li>
                                            <div className="numberSquare">
                                                <span className="number">{food[0]}</span>
                                            </div>

                                            <span style={{marginLeft:"10px"}}>{food[1]}</span>

                                        </li>

                                    ))}
                                </div>

                                <div style={{display:"inline-block",verticalAlign:"middle"}}>
                                    Order Status:<span style={{marginLeft:"5px"}}>{order.status}</span>
                                </div>

                                <button type="button" className="btn btn-warning float-end"
                                        data-bs-toggle="modal" data-bs-target={'#order'+order._id} data-whatever="@mdo"
                                        style={{marginTop:"50px"}} onClick={(event) => setCustomerOrder(order)}>
                                    Rate and Comment for your order
                                </button>




                                <div className="modal fade" id={'order' + order._id} tabIndex="-1" role="dialog"
                                     aria-labelledby="false" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content backgroundColor">
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
                                                               checked={customerOrder.star5}
                                                               onChange={(e) => setCustomerOrder({
                                                                   ...customerOrder,star1: false,star2: false,
                                                                   star3: false,star4: false,star5: true })}/>
                                                        <label htmlFor="rate-5" className="fas fa-star"></label>

                                                        <input type="radio" name="rate" id="rate-4"
                                                               checked={customerOrder.star4}
                                                               onChange={(e) => setCustomerOrder({
                                                                   ...customerOrder,star1: false,star2: false,
                                                                   star3: false,star4: true,star5: false })}/>
                                                        <label htmlFor="rate-4" className="fas fa-star"></label>

                                                        <input type="radio" name="rate" id="rate-3"
                                                               checked={customerOrder.star3}
                                                               onChange={(e) => setCustomerOrder({
                                                                   ...customerOrder,
                                                                   star1: false,star2: false,
                                                                   star3: true,star4: false,star5: false })}/>
                                                        <label htmlFor="rate-3" className="fas fa-star"></label>

                                                        <input type="radio" name="rate" id="rate-2"
                                                               checked={customerOrder.star2}
                                                               onChange={(e) => setCustomerOrder({
                                                                   ...customerOrder,
                                                                   star1: false,star2: true,
                                                                   star3: false,star4: false,star5: false })}/>
                                                        <label htmlFor="rate-2" className="fas fa-star"></label>

                                                        <input type="radio" name="rate" id="rate-1"
                                                               checked={customerOrder.star1}
                                                               onChange={(e) => setCustomerOrder({
                                                                   ...customerOrder,
                                                                   star1: true,star2: false,
                                                                   star3: false,star4: false,star5:false })}/>
                                                        <label htmlFor="rate-1" className="fas fa-star"></label>

                                                        <br/>
                                                        <span></span>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="message-text"
                                                               className="col-form-label">Comment:</label>
                                                        <textarea value={customerOrder.comment} className="form-control" id={"message-text"}
                                                                  onChange={(e) => setCustomerOrder({
                                                                      ...customerOrder,
                                                                      comment: e.target.value })}></textarea>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"
                                                        data-bs-dismiss="modal">Close
                                                </button>
                                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                                onClick={()=>updateCustomerOrder()}>
                                                    Save
                                                </button>
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

export default Customer;