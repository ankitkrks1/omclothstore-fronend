import React, { useEffect, useState } from "react";
// import prodList from "./dummyProducsList";
import Product from "./Product";
import { useSelector, useDispatch } from "react-redux";
import { startLoadIni } from "../../store/product/prodAction";
import './forms.css'

const Products = () => {
  const prodList = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [page, setPage] = useState(3);

  useEffect(() => {
    dispatch(startLoadIni("?sortBy=updatedAt:desc"));
  }, []);
  //Search filer for product
  const handleSearch = (e) => {
    e.preventDefault();
    const query = `?search=pName:${search}`;

    dispatch(startLoadIni(query));
  };
  //sort filter for price asc nd desc
  const handleSort = (e) => {
    const query = `?sortBy=price:${e.target.value}`;

    dispatch(startLoadIni(query));
  };
  //pagination funtion
  const handlePage = (e) => {
    const name = e.target.name;

    if (name === "-" && page !== 3) {
      setPage(page - 3);
      const query = `?skip=${page}`;
      dispatch(startLoadIni(query));
    }
    if (name === "+") {
      setPage(page + 3);
      const query = `?skip=${page}`;
      dispatch(startLoadIni(query));
    }
  };
 
  return (
    <div>
     
      <div className="inputs">
       
        <form onSubmit={handleSearch}>
          <input className="search"
            value={search}
            type="text"
            placeholder="Search Product"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="button" type="submit">Search</button>
        </form>

        <form className="select">
          <label>Filter:</label>
          <select name="sortBy" onChange={(e) => handleSort(e)}>
            <option value="asc">Price-Low to High</option>
            <option value="desc">Price-High to Low</option>
          </select>
        </form>
      </div>
    <div>
    {prodList.map((prod) => (
        <Product prod={prod} />
      ))}
    </div>
     
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
export default Products;
