import React, { useState } from "react";
import "./index.css";
import { TfiAlignJustify } from "react-icons/tfi";

function Menu() {
	const [activeMenu, setActiveMenu] = useState("popular");
	const handleMenuClick = (menu) => {
		setActiveMenu(menu);
	};
	return (
		<div className="menu">
			<div className="menu-list">
				<ul>
					<TfiAlignJustify />
					<li onClick={() => handleMenuClick("popular")}>Popular Items</li>
					<li onClick={() => handleMenuClick("breakfast")}>
						Breakfast Sandwiches
					</li>
					<li onClick={() => handleMenuClick("subs")}>Sandwiches and Subs</li>
				</ul>
			</div>

			<div className="menu-content">
				{activeMenu === "popular" && <div>Popular Items Menu...</div>}
				{activeMenu === "breakfast" && <div>Breakfast Sandwiches Menu...</div>}
				{activeMenu === "subs" && <div>Sandwiches and Subs Menu...</div>}
			</div>
		</div>
	);
}

export default Menu;
