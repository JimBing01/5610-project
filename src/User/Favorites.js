import React, {useEffect, useState} from 'react';
// import db from "../../Database";
// import './ShoppingCart.css';
import {useParams} from "react-router-dom";
import * as client from "./client";

function Favorites() {
  const {userId} = useParams();
  const [items, setItems] = useState([]);

  const removeItem = (itemId) => {
    client.deleteFavorite(userId, itemId).then(() => {
        setItems(items.filter((item) => item.favoriteId !== itemId));
    }).catch((error) => {
        console.error("Error removing favorite item:", error);

    });
};


    useEffect(() => {
        client.fetchFavorites(userId).then((wholeFavorites) => {
            setItems(wholeFavorites);
        });
    }
    , [userId]);

    return (
        <div className="shopping-cart">
            <h2>Favorites</h2>
            <div className="items">
                {items.map((item) => (
                    <div className="item" key={item._id}>
                        <div className="item-image">
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className="item-info">
                            <div className="item-name">{item.name}</div>
                        </div>
                        <button className="item-remove" onClick={() => removeItem(item.favoriteId)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );  
}
 
export default Favorites;
