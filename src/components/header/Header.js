import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <div className="head">
        {console.log(user)}
        <h1>Om Cloth Store</h1>
      </div>
      <div className="nav">
        <ul>
          <li className="item"><Link to="/">Home</Link></li>
          <li className="item">
            <Link to="/products">Products</Link>
          </li>
          <li className="item">
            <Link to="/aboutus">About</Link>
          </li>
          <li className="item">
            {user !== null ? (
              <Link to="/dashboard">DashBoard</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};
export default Header;
