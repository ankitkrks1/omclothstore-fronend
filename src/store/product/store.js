import { createStore, combineReducers, applyMiddleware } from "redux";
import productReducer from "./productReducer";
import userReducer from "../user/userReducer";
import billReducer from "../bills/billReducer";
import thunk from "redux-thunk";

export default createStore(
  combineReducers(
    {
      product: productReducer,
      user:userReducer,
      bill:billReducer
    },
  ), applyMiddleware(thunk)
);