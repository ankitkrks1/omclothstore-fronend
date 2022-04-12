import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { addUser } from "../../store/user/userAction";
import { useDispatch, } from "react-redux";
import "./login.css";
const url = process.env.REACT_APP_API_URL;
const Login = () => {
  const [name, setName] = useState();
  const [signup, setSingup] = useState(false);
  const [password, setPassword] = useState();
  const [isLogin, setIsLogin] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    console.log(name, password);
    const res = await axios.post(`${url}/user/login`, {
      name,
      password,
    });
    console.log(res)
    if(res.status === 200){
      alert('Logged')
    }
    localStorage.setItem("Token", res.data.token);
    localStorage.setItem("User", JSON.stringify(res.data.user));
    // console.log(JSON.parse(localStorage.getItem("User")));
    dispatch(addUser(res.data.user));
    setIsLogin(true);
  };
  const handleSignup = async () => {
    console.log(name, password);
    const res = await axios.post(`${url}/user/signup`, {
      name,
      password,
    });

    localStorage.setItem("Token", res.data.token);
    dispatch(addUser(res.data.user));
    localStorage.setItem("User", JSON.stringify(res.data.user));
    console.log(JSON.parse(localStorage.getItem("User")));
    setIsLogin(true);
  };
  return (
    <>
    {console.log(url)}
      <div className="text">
        <h3>Login is required to Add new Product with Admin access</h3>
      </div>
      <div className="login">
        {signup ? (
          <div className="inputs">
            <input
              className="search"
              placeholder="Choose a user Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="search"
              placeholder="Choose a Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button" onClick={handleSignup}>
              Signup
            </button>
            <p>Already have an Account ?</p>
            <button className="button" onClick={() => setSingup(false)}>
              login
            </button>
            {isLogin && <Navigate to="/dashboard" />}
          </div>
        ) : (
          <div className="inputs">
            <input
              className="search"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="search"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button" onClick={handleLogin}>
              Login
            </button>
            {!isLogin && <h1>Loading</h1>}
            <p>New User Click Signup</p>
            <button className="button" onClick={() => setSingup(true)}>
              Signup
            </button>
            {isLogin && <Navigate to="/dashboard" />}
          </div>
        )}
      </div>
    </>
  );
};
export default Login;
