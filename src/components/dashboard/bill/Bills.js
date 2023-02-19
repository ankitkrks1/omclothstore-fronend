import React, { useEffect, useState } from "react";
// import prodList from "./dummyProducsList";
import Bill from "./Bill";
import { useSelector, useDispatch } from "react-redux";
import { startLoadIni,startAddBill } from '../../../store/bills/billAction';

const Bills = () => {
  const billList = useSelector((state) => state.bill);
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [page,setPage]= useState(0)

  useEffect(() => {
    dispatch(startLoadIni("?sortBy=updatedAt:desc"));
  }, []);
  //Search filer for product
  const handleSearch = (e) => {
    e.preventDefault();
    const query = `?search=billNo:${search}`;
 
    dispatch(startLoadIni(query));
  };
  //sort filter for price asc nd desc
  const handleSort = (e) => {
    const query = `?sortBy=billAmount:${e.target.value}`;
    dispatch(startLoadIni(query))
  };
  //pagination funtion
  const handlePage =(e)=>{
   const name = e.target.name
  
    if(name === '-' && page!==0){
      setPage(page-3)
      const query = `?skip=${page}`
      dispatch(startLoadIni(query))
    }
    if(name === '+'){
      setPage(page+3)
      const query = `?skip=${page}`
      dispatch(startLoadIni(query))
    }
    
   
  }
  const handleBillSave = (e) => {
    e.preventDefault();
    // const namPricee = e.target.name.value;
    const billNo = e.target.billno.value;
    const billAmount = e.target.amount.value;
    // console.log(name, quantity, price);
    dispatch(startAddBill({billNo,billAmount}));
    e.target.billno.value ='';
    e.target.amount.value = '';
  };
  return (
    <div>
      <div className="inputs">
        <h2>Add New Bill</h2>
      <form onSubmit={handleBillSave}>
          {/* <input type="text" name="name" placeholder="Product Name" /> */}
          <input  className="search" type="text" name="billno" placeholder="Bill No." />
          <input  className="search" type="text" name="amount" placeholder="Amount" />
          {/* <textarea name='description'></textarea> */}
          <button className="button" type="submit">Save</button>
        </form>
        <form onSubmit={handleSearch}>
          <input
          className="search"
            value={search}
            type="text"
            placeholder="Search Bill No."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="button" type="submit">Search</button>
        </form>

        <form className="select">
          <label>Filter:</label>
          <select name="sortBy" onChange={(e) => handleSort(e)}>
            <option value="asc">Bill Amount-Low to High</option>
            <option value="desc">Bill Amount-High to Low</option>
          </select>
        </form>
      </div>

      {billList.map((bill) => (
        <Bill bill={bill}/>
      ))}
      <div className="page">
        <button className="page-btn" name='-' onClick={handlePage}>Previous</button>
        <button className="page-btn" name='+' onClick={handlePage} >Next</button>
      </div>
    </div>
  );
};
export default Bills;
