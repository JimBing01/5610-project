import { NavLink} from 'react-router-dom';
import { IoMdInformationCircleOutline, IoIosLogOut } from 'react-icons/io';
import { MdPayment, MdOutlineLocationOn, MdOutlineHistory, MdShoppingCart } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SideBar.css';
import * as client from './client';

function SideBar({userId}) {
  const [userInfo, setUserInfo] = useState({});
  const {userId: id} = useParams();
  // const navigate = useNavigate(); //yiming

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


  // yiming
  const handleSignOut = async () => {
    try {
      await client.signout(); // This should send a POST request to '/api/users/signout'
      // Then you can navigate to the home page
      window.location.href = "/Home"; // This will cause a full page refresh, which can help ensure that all user data is cleared
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="Sidebar">
      <ul>
        {/* get user first name */}
        <li>Welcome {userInfo.firstName}!</li>
        <li>
          <NavLink to={"/user/"+ userId +"/account-info"} className={({ isActive }) => isActive ? 'active' : ''}>
            <IoMdInformationCircleOutline /> Account Info
          </NavLink>
        </li>
        <li>
          <NavLink to={"/user/"+ userId +"/payment-methods"} className={({ isActive }) => isActive ? 'active' : ''}>
            <MdPayment /> Payment Methods
          </NavLink>
        </li>
        <li>
          <NavLink to={"/user/"+ userId +"/addresses"} className={({ isActive }) => isActive ? 'active' : ''}>
            <MdOutlineLocationOn /> Addresses
          </NavLink>
        </li>
        <li>
          <NavLink to={"/user/"+ userId +"/orders"} className={({ isActive }) => isActive ? 'active' : ''}>
            <MdOutlineHistory /> Orders
          </NavLink>
        </li>
        <li>
          <NavLink to={"/user/"+ userId +"/shopping-cart"} className={({ isActive }) => (isActive ? 'active' : '')}>
            <MdShoppingCart /> Shopping Cart
          </NavLink>
        </li>
        <li>
          <NavLink to={"/home"} className={({ isActive }) => isActive ? 'active' : ''}>
            <IoIosLogOut /> Sign Out
          </NavLink>
        </li>

      </ul>
    </div>
  );
}

export default SideBar;
