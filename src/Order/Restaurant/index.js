import db from "../../Database";
import {Link} from "react-router-dom";
import "./index.css";
import sandwich1 from "../../images/sandwich1.jpg"

function Restaurant() {

    return (
        <div>
            <div style={{marginLeft:"30px"}}>
                <span style={{fontSize:"30px",font:"Sweet-Sans-Regular"}}>Order</span>
                <div className="flex-row card-over-4">
                    <ul className="d-flex flex-row flex-wrap row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
                        {db.restaurantOrder.map((order) => (
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
                                        style={{marginTop:"50px"}}>Notify driver</button>


                                <hr className="hr-style"></hr>


                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default Restaurant;