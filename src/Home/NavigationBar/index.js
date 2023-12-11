import React, {useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import { BiUserCircle, BiHome, BiMenu } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./index.css";
import SearchBar from "../Menu/SearchBar"
import ApiSearchBar from "./ApiSearchBar";

function HorizontalNavigation({onSelectSandwich}) {
	const {userId} = useParams();
	const { pathname } = useLocation();

	let temp = null;
	if(pathname.includes('user')) {
		temp = 'user/' + userId
	} else if(pathname.includes('restaurant')) {
		temp = 'restaurant/'+ userId
	} else if(pathname.includes('delivery')) {
		temp = 'delivery/'+ userId
	}

	const leftLinks = [
		{ name: "Home", icon: <BiHome className="nav-icon" />,
			to: temp == null ? '/home' : '/home/'+ temp

		},
		// { name: "Menu", icon: <BiMenu className="nav-icon" />, to: "/menu" },
	];

	const rightLinks = [
		{
			name: "Account",
			icon: <BiUserCircle className="nav-icon" />,
			to: temp == null ? '/login' : '/'+temp,
		},
		{
			name: "Cart",
			icon: <AiOutlineShoppingCart className="nav-icon" />,
			to: temp == null ? '/login' : "/" + temp + "/shopping-cart",
		},
	];


	return (
		<div className="horizontal-navigation">

			<div className="nav-group left">
				{leftLinks.map((link, index) => (
					<Link
						key={index}
						to={link.to}
						className={`nav-item ${pathname === link.to ? "active" : ""}`}>
						{link.icon}
						{link.name}
					</Link>
				))}
				<a
					href="#menu-section-on-home-page"
					className="nav-item">
					<BiMenu className="nav-icon" />
					Menu
				</a>
				<div className="remote-api-search-bar">
					<ApiSearchBar />
				</div>
				
			</div>

			<div className="center-group">
				<div className="logo">
					<Link to={temp == null ? '/home' : '/home/' + temp}>
						<img src="/images/wollastons-logo.png" alt="Logo" className="logo-image" />
					</Link>
				</div>
			</div>

			<div className="nav-group right">
				<div className="search-bar">
					<SearchBar onSelectSandwich={onSelectSandwich} />
				</div>
				{rightLinks.map((link, index) => (
					<Link
						key={index}
						to={link.to}
						className={`nav-item ${pathname === link.to ? "active" : ""}`}>
						{link.icon}
						{link.name}
					</Link>
				))}
			</div>
		</div>
	);
}

export default HorizontalNavigation;
