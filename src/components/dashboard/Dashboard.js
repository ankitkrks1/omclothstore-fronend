import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserProduct from "./UserProduct";
import { removeUser } from "../../store/user/userAction";
import Bills from "../dashboard/bill/Bills";
import Spinner from "../spinner/Spinner";

const url = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [logout, setLogout] = useState(false);
  const [showProduct, setShowProduct] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true)
    const res = await axios.post(
      `${url}/user/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      }
    );
    setIsLoading(false)
    setLogout(true);
    localStorage.clear();
    dispatch(removeUser());
    console.log(res.data);
    window.location.reload(true);
  };
  // const handleProdSave = (e) => {
  //   e.preventDefault();
  //   const name = e.target.name.value;
  //   const quantity = e.target.quantity.value;
  //   const price = e.target.price.value;
  //   console.log(name, quantity, price);
  //   dispatch(startAddProd({ pName: name, pQuantity: quantity, price }));
  // };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div>
            <div className="logout">
              <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="option">
              <h2>Welcome {user.name} to DashBoard</h2>
              {logout && <Navigate to="/" />}
            </div>
          </div>

          <div className="option">
            <button className="page-btn" onClick={() => setShowProduct(true)}>
              Products
            </button>
            <button className="page-btn" onClick={() => setShowProduct(false)}>
              Bills
            </button>
          </div>
          <div>{showProduct ? <UserProduct /> : <Bills />}</div>
        </>
      )}
    </>
  );
};
export default Dashboard;
