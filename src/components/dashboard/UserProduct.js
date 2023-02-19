import React, { useEffect, useState } from "react";
// import prodList from "./dummyProducsList";
import Product from "../product/Product";
import { useSelector, useDispatch } from "react-redux";
import {
  startUserProdLoad,
  startAddProd,
} from "../../store/product/prodAction";
import Spinner from "../spinner/Spinner";
const UserProduct = () => {
  const prodList = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
  
    dispatch(startUserProdLoad("?sortBy=updatedAt:desc"));
  
  }, []);
  //Search filer for product
  const handleSearch = (e) => {
    e.preventDefault();
    const query = `?search=pName:${search}`;

    dispatch(startUserProdLoad(query));
  };
  //sort filter for price asc nd desc
  const handleSort = (e) => {
    const query = `?sortBy=price:${e.target.value}`;

    dispatch(startUserProdLoad(query));
  };
  //pagination funtion
  const handlePage = (e) => {
    const name = e.target.name;

    if (name === "-" && page !== 0) {
      setPage(page - 3);
      const query = `?skip=${page}`;
      dispatch(startUserProdLoad(query));
    }
    if (name === "+") {
      setPage(page + 3);
      const query = `?skip=${page}`;
      dispatch(startUserProdLoad(query));
    }
  };
  const handleProdSave = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const quantity = e.target.quantity.value;
    const price = e.target.price.value;
    console.log(name, quantity, price);
    dispatch(startAddProd({ pName: name, pQuantity: quantity, price }));
    e.target.name.value = '';
     e.target.quantity.value = '';
    e.target.price.value = '';
    console.log(name, quantity, price);
  };
  return (
    <div>
      <div className="inputs">
        <h2>Add New Product</h2>
        <form onSubmit={handleProdSave}>
          <input
            className="search"
            type="text"
            name="name"
            placeholder="Product Name"
          />
          <input
            className="search"
            type="text"
            name="quantity"
            placeholder="Quantity"
          />
          <input
            className="search"
            type="text"
            name="price"
            placeholder="Price"
          />
          {/* <textarea name='description'></textarea> */}
          <button className="button" type="submit">
            Save
          </button>
        </form>
        <form onSubmit={handleSearch}>
          <input
            className="search"
            value={search}
            type="text"
            placeholder="Search Product"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="button" type="submit">
            Search
          </button>
        </form>

        <form className="select">
          <label>Filter:</label>
          <select name="sortBy" onChange={(e) => handleSort(e)}>
            <option value="asc">Price-Low to High</option>
            <option value="desc">Price-High to Low</option>
          </select>
        </form>
      </div>

      {prodList.map((prod) => (
        <Product prod={prod} />
      ))}
      <div className="page">
        <button className="page-btn" name="-" onClick={handlePage}>
          Previous
        </button>
        <button className="page-btn" name="+" onClick={handlePage}>
          Next
        </button>
      </div>
    </div>
  );
};
export default UserProduct;
