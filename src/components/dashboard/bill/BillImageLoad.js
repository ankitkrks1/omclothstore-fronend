import { React, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { startRemoveBill } from "../../../store/bills/billAction";
const url = process.env.REACT_APP_API_URL
const BillImageLoad = ({query,uploaded,id})=> {
    const dispatch = useDispatch()

  const [file,setFile]=useState(null)
  // On file select (from the pop up)

  const onFileChange = (event) => {
    // Update the state
    setFile(event.target.files[0])
  };

  // On file upload (click the upload button)
  const onImageUpload = async () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "billImg", // this should be same as in backend upoload.single('prodImg')
      file,
      file.name
    );

    // Details of the uploaded file
    console.log(file);

    // Request made to the backend api
    // Send formData object
    const header = {
      "Content-Type": "application/json",
      "Authorization":
        `Bearer ${localStorage.getItem('Token')}`,
    };
   const res = await axios.post(
      `${url}${query}/${id}`,
      formData,
      {
        headers: header,
      }
    );
    if(res.status===200){
        uploaded()
    }
    console.log('staus',res.status)
  };

  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
    if (file) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {file.name}</p>

          <p>File Type: {file.type}</p>

          <p>
            Last Modified:{" "}
            {file.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
      
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  const handleDelete =async ()=>{
    dispatch(startRemoveBill(id))
    uploaded()
  }
  return (
    <div>
      <h1>Update/Edit-Image</h1>
      
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onImageUpload}>Upload!</button>
        <button onClick={()=>uploaded()}>Cancel</button>
        <button onClick={handleDelete}>Delete Product</button>
      </div>
      {fileData()}
    </div>
  );
}

export default BillImageLoad;
