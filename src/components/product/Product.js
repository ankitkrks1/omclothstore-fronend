import React,{useState} from "react";
import { useSelector } from "react-redux";
import ImageUpload from "../dashboard/ImageUpload";
import "./product.css";

const url = process.env.REACT_APP_API_URL
// "_id": "624fd20629859bc5f350c3a9",
// "pName": "Jeans",
// "pQuantity": 10,
// "price": 1000,
// "createdBy": "624fd1a429859bc5f350c39b",
// "createdAt": "2022-04-08T06:11:18.186Z",
// "updatedAt": "2022-04-08T06:13:22.202Z",
// "__v": 0

const Product = ({ prod }) => {
  const user = useSelector(state=>state.user)
  const [edit, setEdit]=useState(false)
  
  return (
   <>
   {edit ? <ImageUpload query={`/product/upload/image`} id={prod._id} uploaded={()=>setEdit(false)}/>:  <div className="card-container" key={prod._id}>
<div className="card u-clearfix" key={prod._id} >
  <div className="card-body">
    <span className="card-number card-circle subtle">Quantity{prod.pQuantity}</span>
    <span className="card-author subtle">₹{prod.price}</span>
    <h2 className="card-title"  >{prod.pName}</h2>
    {/* <span className="card-description subtle">These last few weeks I have been working hard on a new brunch recipe for you all.</span> */}
    <div className="card-read"  >Buy</div>
    {user!==null && <span onClick={()=>setEdit(true)} className="card-tag card-circle subtle">Edit</span>}
  </div>
  <img src={`${url}/product/${prod._id}/prodImg`} alt="Product" className="card-media"  key={prod._id}/>
</div>
<div className="card-shadow"   key={`${prod._id}1`}></div>

</div>}
   </>
  
)
};
export default Product;
