import React, { useState, useRef } from "react";
import image from "./images/profile-icon.png";
import "./App.css";
import userApi from "./service";
import { validateForm } from "./helper";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    surName: "",
    dob: "",
    email: "",
    numOfChild: "",
    interests: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    surName: "",
    dob: "",
    email: "",
    numOfChild: "",
  });
  const [picture, setpicture] = useState();
  const [previewURL, setPreviewURL] = useState(image);
  const [uploaderr, setUploaderr] = useState("");
  const fileInputRef = useRef(null);

  //on input change handler
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetFormData = () => {
    setFormData({
      firstName: "",
      surName: "",
      dob: "",
      email: "",
      numOfChild: "",
      interests: "",
    });
    setPreviewURL(image);
    setpicture(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  //handling picture upload by verifying its type
  function handlePicUpload(e) {
    const file = e.target.files[0];
    const fileType = file?.type ?? "";
    if (file && (fileType === "image/jpeg" || fileType === "image/png")) {
      const imageURL = URL.createObjectURL(file);
      setPreviewURL(imageURL);
      setpicture(file);
      setUploaderr("");
    } else {
      setUploaderr("Please select a JPEG or PNG image.");
      e.target.value = ""; // Clear the input field
      setPreviewURL(image);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default form submission
    }
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(formData, setFormErrors)) {
      const userData = new FormData();
      for (const data in formData) {
        userData.append(data, formData[data]);
      }
      userData.append("picture", picture);
      userApi(userData);
      resetFormData();
    }
  };

  return (
    <div className="App">
      <header className="app-heading">
        <h4>USER DETAILS</h4>
      </header>
      {/*form fields for user details */}
      <div className="app_user_container">
        <div className="app_user_details">
          <form
            onSubmit={handleSubmit}
            id="app_user_form"
            encType="multipart/form-data"
          >
            <div className="user_details field_fn">
              <label className="user_details_lab" htmlFor="firstname">
                First Name <span className="required_field">*</span>
              </label>
              <div className="ud_field fn_container">
                <input
                  className="user_details_input"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={onChangeHandler}
                />
              </div>
              {formErrors.firstName && (
                <span className="ud_error_message">{formErrors.firstName}</span>
              )}
            </div>

            <div className="user_details field_sn">
              <label className="user_details_lab" htmlFor="surname">
                Surname <span className="required_field">*</span>
              </label>
              <div className="ud_field field_sn_input">
                <input
                  className="user_details_input"
                  type="text"
                  name="surName"
                  value={formData.surName}
                  onChange={onChangeHandler}
                />
              </div>
              {formErrors.surName && (
                <span className="ud_error_message">{formErrors.surName}</span>
              )}
            </div>

            <div className="user_details field_dob">
              <label className="user_details_lab" htmlFor="dob">
                Date Of Birth <span className="required_field">*</span>
              </label>
              <div className="ud_field field_dob_input">
                <input
                  className="user_details_input"
                  type="date"
                  name="dob"
                  min="1930-01-01"
                  max="2022-12-31"
                  value={formData.dob}
                  onChange={onChangeHandler}
                />
              </div>
              {formErrors.dob && (
                <span className="ud_error_message">{formErrors.dob}</span>
              )}
            </div>

            <div className="user_details field_email">
              <label className="user_details_lab" htmlFor="email">
                Email Address <span className="required_field">*</span>
              </label>
              <div className="ud_field field_email_input">
                <input
                  className="user_details_input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChangeHandler}
                />
              </div>
              {formErrors.email && (
                <span className="ud_error_message">{formErrors.email}</span>
              )}
            </div>

            <div className="user_details field_noc">
              <label className="user_details_lab" htmlFor="numofchild">
                Number Of Children <span className="required_field">*</span>
              </label>
              <div className="ud_field field_noc_input">
                <input
                  className="user_details_input"
                  type="number"
                  name="numOfChild"
                  value={formData.numOfChild}
                  onChange={onChangeHandler}
                  onKeyPress={handleKeyPress}
                />
              </div>
              {formErrors.numOfChild && (
                <span className="ud_error_message">
                  {formErrors.numOfChild}
                </span>
              )}
            </div>

            <div className="user_details field_intrst">
              <label className="user_details_lab" htmlFor="interests">
                Interests
              </label>
              <div className="ud_field field_intrst_input">
                <textarea
                  className="user_details_input"
                  id="interests"
                  name="interests"
                  rows="4"
                  cols="50"
                  value={formData.interests}
                  onChange={onChangeHandler}
                ></textarea>
              </div>
            </div>

            <div className="user_details field_pic">
              <label className="user_details_lab" htmlFor="picture">
                Upload Picture
              </label>
              <div className="ud_field field_pic_input">
                {previewURL && (
                  <img className="pic_preview" src={previewURL} alt="preview" />
                )}
                <span />
                <input
                  className="user_details_input"
                  type="file"
                  name="picture"
                  accept=".jpeg, .jpg, .png"
                  onChange={handlePicUpload}
                  ref={fileInputRef}
                />
              </div>
            </div>

            <div className="ud_error_message">{uploaderr}</div>
            <div className="user_details form_submit">
              <input type="submit" value="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
