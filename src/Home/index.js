import {Link} from "react-router-dom";
import restaurant from "../Order/Restaurant";
import "./index.css"
function Home() {

    const handleClick = (x =1,parameter = "Hello") => {
        console.log(parameter)
        console.log(x)
    }


    return (
        <div class="container">
            <div class="post">
                <div class="text">Thanks for rating us!</div>
                <div class="edit">EDIT</div>
            </div>
            <div class="star-widget">
                <input type="radio" name="rate" id="rate-5"/>
                <label for="rate-5" class="fas fa-star"></label>
                <input type="radio" name="rate" id="rate-4"/>
                <label for="rate-4" class="fas fa-star"></label>
                <input type="radio" name="rate" id="rate-3"/>
                <label for="rate-3" class="fas fa-star"></label>
                <input type="radio" name="rate" id="rate-2"/>
                <label for="rate-2" class="fas fa-star"></label>
                <input type="radio" name="rate" id="rate-1"/>
                <label for="rate-1" class="fas fa-star"></label>
                <form action="#">
                    <header></header>
                    <div class="textarea">
                        <textarea cols="30" placeholder="Describe your experience.."></textarea>
                    </div>
                    <div class="btn">
                        <button type="submit">Post</button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Home;