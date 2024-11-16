import React, { useState } from "react";
import { backend_url } from '../App';
import upload_area from '../../src/assets/upload_area.svg';
import { useNavigate } from "react-router-dom";
import './Addcontact.css';

export const Addcontact = () => {
  const [image, setImage] = useState(null);
  const [contactDetails, setContactDetails] = useState({
    name: "",
    last_name: "",
    image: "",
    email: "",
    phone_no: "",
    company: "",
    job_title: "",
  });

  const navigate = useNavigate();

  const AddContact = async () => {
    try {
      let dataObj;
      const formData = new FormData();
      if (image) {
        formData.append("contact", image);
      }

      // Upload the image
      await fetch(`${backend_url}/upload`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          dataObj = data;
        });

      // If image upload is successful, proceed with contact creation
      if (dataObj?.success) {
        const updatedContact = {
          ...contactDetails,
          image: dataObj.image_url,
        };

        await fetch(`${backend_url}/add-contact`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContact),
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.success) {
              alert("Contact Added Successfully!");
              navigate("/contacts"); // Navigate to contacts page
            } else {
              alert("Failed to add contact. Please try again.");
            }
          });
      } else {
        alert("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error adding contact:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const changeHandler = (e) => {
    setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>First Name</p>
        <input
          type="text"
          name="name"
          value={contactDetails.name}
          onChange={changeHandler}
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Last Name</p>
        <input
          type="text"
          name="last_name"
          value={contactDetails.last_name}
          onChange={changeHandler}
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={contactDetails.email}
            onChange={changeHandler}
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Phone Number</p>
          <input
            type="tel"
            name="phone_no"
            value={contactDetails.phone_no}
            onChange={changeHandler}
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Company</p>
          <input
            type="text"
            name="company"
            value={contactDetails.company}
            onChange={changeHandler}
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Job Title</p>
          <input
            type="text"
            name="job_title"
            value={contactDetails.job_title}
            onChange={changeHandler}
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Image</p>
        <label htmlFor="file-input">
          <img
            className="addproduct-thumbnail-img"
            src={!image ? upload_area : URL.createObjectURL(image)}
            alt="Upload"
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          name="image"
          id="file-input"
          accept="image/*"
          hidden
        />
      </div>
      <button className="addproduct-btn" onClick={() => { AddContact() }}>
        ADD
      </button>
    </div>
  );
};
