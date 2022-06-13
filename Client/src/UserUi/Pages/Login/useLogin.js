import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useLogin = (validate, callback) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const config = {
    header: { "Content-Type": "application/json" },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    const Data = {
      email: values.email,

      password: values.password,
    };
    if (Data.emaiL != "" && Data.password != "") {
      axios.post("/admin_register/login", Data, config).then((result) => {
        if (result.data.success === false) {
          if (result.data.emailToken === true)
            return setErrors({ ...errors, email: result.data.error });
          if (result.data.passwordToken === true)
            return setErrors({ ...errors, password: result.data.error });
        }
        localStorage.setItem("authToken", result.data);
        navigate("/");
      });
    }
  };

  return { handleChange, handleSubmit, values, errors };
};

export default useLogin;
