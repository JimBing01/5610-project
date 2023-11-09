import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Ensure you have react-icons installed
import './Header.css'; // Your custom CSS for styling

function Header() {
  return (
    <header className="Header">
      <div className="HeaderContent">
        <h1 className="HeaderTitle">Sandwich</h1>
        <Link to="/shopping-cart" className="ShoppingCartLink">
          <FaShoppingCart />
        </Link>
      </div>
    </header>
  );
}

export default Header;
