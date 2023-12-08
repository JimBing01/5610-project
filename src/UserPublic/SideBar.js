import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdInformationCircleOutline, IoIosLogOut } from 'react-icons/io';
import { MdPayment, MdOutlineLocationOn, MdOutlineHistory, MdShoppingCart } from 'react-icons/md';
import './SideBar.css';

function SideBar({userId}) {

  return (
    <div className="Sidebar">
      <ul>
        <li>
          <NavLink to={"/user/public/"+ userId +"/account-info"} className={({ isActive }) => isActive ? 'active' : ''}>
            <IoMdInformationCircleOutline /> Account Info
          </NavLink>
        </li>
        <li>
          <NavLink to={"/user/public/"+ userId +"/orders"} className={({ isActive }) => isActive ? 'active' : ''}>
            <MdOutlineHistory /> Orders
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
