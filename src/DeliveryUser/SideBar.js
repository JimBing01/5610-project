import React from 'react';
import {NavLink, useParams} from 'react-router-dom';
import { IoMdInformationCircleOutline, IoIosLogOut } from 'react-icons/io';
import { MdPayment, MdOutlineLocationOn, MdOutlineHistory, MdShoppingCart } from 'react-icons/md';
import './SideBar.css';

function SideBar() {

  const {userId} = useParams();
  return (
    <div className="Sidebar">
      <ul>
        <li>
          <NavLink to={"/delivery/"+ userId +"/account-info"} className={({ isActive }) => isActive ? 'active' : ''}>
            <IoMdInformationCircleOutline /> Account Info
          </NavLink>
        </li>
        <li>
          <NavLink to={"/delivery/"+ userId +"/payment-methods"} className={({ isActive }) => isActive ? 'active' : ''}>
            <MdPayment /> Payment Methods
          </NavLink>
        </li>
        <li>
          <NavLink to={"/delivery/"+ userId +"/addresses"} className={({ isActive }) => isActive ? 'active' : ''}>
            <MdOutlineLocationOn /> Addresses
          </NavLink>
        </li>
        <li>
          <NavLink to={"/delivery/"+ userId +"/orders"} className={({ isActive }) => isActive ? 'active' : ''}>
            <MdOutlineHistory /> Orders
          </NavLink>
        </li>
        <li>
          <NavLink to={"/delivery/"+ userId +"/shopping-cart"} className={({ isActive }) => (isActive ? 'active' : '')}>
            <MdShoppingCart /> Shopping Cart
          </NavLink>
        </li>
        <li>
          <NavLink to={"/delivery/"+ userId +"/sign-out"} className={({ isActive }) => isActive ? 'active' : ''}>
            <IoIosLogOut /> Sign Out
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
