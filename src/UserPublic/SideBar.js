
import { NavLink } from 'react-router-dom';
import { IoMdInformationCircleOutline, IoIosLogOut } from 'react-icons/io';
import { MdPayment, MdOutlineLocationOn, MdOutlineHistory, MdShoppingCart } from 'react-icons/md';
import './SideBar.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as client from './client';

function SideBar({userId}) {
  const [userInfo, setUserInfo] = useState({});
  const {userId: id} = useParams();
  const {pre} = useParams();
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        client.getUserById(id).then((data) => {
          setUserInfo(data);
        }
        );
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    }

    if (id) {
      fetchUserInfo();
    }
  }, [id]);

  return (
    <div className="Sidebar">
      <ul>
      <li>{userInfo.firstName}' Profile</li>
        <li>
          <NavLink to={"/user/public/"+ userId + '/' + pre + "/account-info"} className={({ isActive }) => isActive ? 'active' : ''}>
            <IoMdInformationCircleOutline /> Account Info
          </NavLink>
        </li>
        <li>
          <NavLink to={"/user/public/"+ userId + '/' + pre +"/orders"} className={({ isActive }) => isActive ? 'active' : ''}>
            <MdOutlineHistory /> Past Orders
          </NavLink>
        </li>
      </ul>
    </div>
  );

}

export default SideBar;
