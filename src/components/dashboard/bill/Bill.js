
import React,{useState} from "react";
import { useSelector } from "react-redux";

import '../../product/product.css';
import BillImageLoad from "./BillImageLoad";

const url = process.env.REACT_APP_API_URL
// "_id": "624fd20629859bc5f350c3a9",
// "pName": "Jeans",
// "pQuantity": 10,
// "price": 1000,
// "createdBy": "624fd1a429859bc5f350c39b",
// "createdAt": "2022-04-08T06:11:18.186Z",
// "updatedAt": "2022-04-08T06:13:22.202Z",
// "__v": 0

const Bill = ({ bill }) => {
  const user = useSelector(state=>state.user)
  const [edit, setEdit]=useState(false)
 
  return (
   <>
   {edit ? <BillImageLoad query={'/bill/upload/image'} id={bill._id} uploaded={()=>setEdit(false)}/>:  <div className="card-container" key={bill._id}>
<div className="card u-clearfix" key={bill._id} >
  <div className="card-body" key={bill._id}>
    <span className="card-number card-circle subtle">Bill No.{bill.billNo}</span>
    <span className="card-author subtle">Amount:- ₹{bill.billAmount}</span>
    {/* <h2 className="card-title">{prod.pName}</h2> */}
    {/* <span className="card-description subtle">These last few weeks I have been working hard on a new brunch recipe for you all.</span> */}
    {/* <div className="card-read">Buy</div> */}
    {user.name && <span onClick={()=>setEdit(true)} className="card-tag card-circle subtle">Edit</span>}
  </div>
  <a href={`${url}/bill/${bill._id}/billImg`} target='_blank' rel="noreferrer" ><img src={`${url}/bill/${bill._id}/billImg`} alt="bill" className="card-media" width='282' height='361' />
</a>
  </div>

<div className="card-shadow"></div>

</div>}
   
   </>
  
)
};
export default Bill;
