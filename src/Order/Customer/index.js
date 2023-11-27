import db from "../../Database";
import {Link} from "react-router-dom";
import "./index.css";
import sandwich1 from "../../images/sandwich1.jpg"

function Customer() {

    return (
        <div className="backgroundColor" >
            <div style={{marginLeft:"330px"}}>
                <span style={{fontSize:"30px",font:"Sweet-Sans-Regular"}}>Past Order</span>
                <div className="flex-row card-over-4">
                    <ul className="d-flex flex-row flex-wrap row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
                        {db.customerOrder.map((order) => (
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
                                        data-bs-toggle="modal" data-bs-target={'#order'+order.id} data-whatever="@mdo"
                                        style={{marginTop:"50px"}}>Rate and Comment for your order</button>
                                <div className="modal fade" id={'order' + order.id} tabIndex="-1" role="dialog"
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
                                                        <input type="radio" name="rate" id="rate-5"/>
                                                        <label htmlFor="rate-5" className="fas fa-star"></label>
                                                        <input type="radio" name="rate" id="rate-4"/>
                                                        <label htmlFor="rate-4" className="fas fa-star"></label>
                                                        <input type="radio" name="rate" id="rate-3"/>
                                                        <label htmlFor="rate-3" className="fas fa-star"></label>
                                                        <input type="radio" name="rate" id="rate-2"/>
                                                        <label htmlFor="rate-2" className="fas fa-star"></label>
                                                        <input type="radio" name="rate" id="rate-1"/>
                                                        <label htmlFor="rate-1" className="fas fa-star"></label>
                                                        <br/>
                                                        <span></span>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="message-text"
                                                               className="col-form-label">Comment:</label>
                                                        <textarea className="form-control" id="message-text"></textarea>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"
                                                        data-bs-dismiss="modal">Close
                                                </button>
                                                <button type="button" className="btn btn-primary">Send message</button>
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