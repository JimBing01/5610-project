import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { MdPayment, MdOutlineLocationOn, MdOutlineHistory } from 'react-icons/md';
import './SideBar.css';

function SideBar() {
  return (
    <div className="Sidebar">
      <ul>
        <li>
          <NavLink to="account-info" className={({ isActive }) => isActive ? 'active' : ''}>
            <IoMdInformationCircleOutline /> Account Info
          </NavLink>
        </li>
        <li>
          <NavLink to="payment-methods" className={({ isActive }) => isActive ? 'active' : ''}>
            <MdPayment /> Payment Methods
          </NavLink>
        </li>
        <li>
          <NavLink to="addresses" className={({ isActive }) => isActive ? 'active' : ''}>
            <MdOutlineLocationOn /> Addresses
          </NavLink>
        </li>
        <li>
          <NavLink to="orders" className={({ isActive }) => isActive ? 'active' : ''}>
            <MdOutlineHistory /> Orders
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
