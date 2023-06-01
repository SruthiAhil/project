// validate form
export const validateForm = (formData, setFormErrors) => {
  let errors = {};
  let isValid = true;
  if (formData.firstName.trim() === "") {
    errors.firstName = "First Name is required";
    isValid = false;
  }
  if (formData.surName.trim() === "") {
    errors.surName = "surame is required";
    isValid = false;
  }
  if (formData.dob.trim() === "") {
    errors.dob = "Date of birth is required";
    isValid = false;
  }
  if (formData.email.trim() === "") {
    errors.email = "Email address is required";
    isValid = false;
  }
  if (formData.numOfChild.trim() === "") {
    errors.numOfChild = "Number of children is required";
    isValid = false;
  }
  setFormErrors(errors);
  return isValid;
};
