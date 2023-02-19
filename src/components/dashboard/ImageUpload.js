import { React, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { startRemoveProd } from "../../store/product/prodAction";
import "./upload.css";
import Spinner from "../spinner/Spinner";
const url = process.env.REACT_APP_API_URL;

const ImageUpload = ({ query, uploaded, id, pName }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  // On file select (from the pop up)

  const onFileChange = (event) => {
    // Update the state
    setFile(event.target.files[0]);
  };

  // On file upload (click the upload button)
  const onImageUpload = async () => {
    setIsLoading(true);

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "prodImg", // this should be same as in backend upoload.single('prodImg')
      file,
      file.name
    );

    // Details of the uploaded file
    console.log(file);

    // Request made to the backend api
    // Send formData object
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    };
    const res = await axios.post(`${url}${query}/${id}`, formData, {
      headers: header,
    });
    if (res.status === 200) {
      uploaded();
      setIsLoading(false);
    }
    console.log("staus", res.status);
  };

  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
    if (file) {
      return (
        <div>
          <h2 className="page">File Details:</h2>

          <p className="page">File Name: {file.name}</p>

          <p className="page">File Type: {file.type}</p>

          <p className="page">
            Last Modified: {file.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div className="page">
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  const handleDelete = async () => {
   
    dispatch(startRemoveProd(id));
    uploaded();
    
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="page">Update/Edit-Image of {pName}</h1>

          <div className="page">
            <input className="page" type="file" onChange={onFileChange} />
            <button disabled={!file} className="edit-btn" onClick={onImageUpload}>
              Upload!
            </button>
            <button className="edit-btn-cancel" onClick={() => uploaded()}>
              Cancel
            </button>
            <button className="edit-btn-delete" onClick={handleDelete}>
              Delete Product
            </button>
          </div>
          {fileData()}
        </div>
      )}
    </>
  );
};

export default ImageUpload;
