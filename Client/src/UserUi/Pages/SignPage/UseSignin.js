import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useSignIn = (validate, noErros) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e, history) => {
    e.preventDefault();
    localStorage.removeItem("authToken");
    const config = {
      header: { "Content-Type": "application/json" },
    };
    setErrors(validate(values));
    const Data = {
      email: values.email,
      username: values.name,
      password: values.password,
      password2: values.password2,
    };
    if (
      Data.emaiL !== "" &&
      Data.password !== "" &&
      Data.username !== "" &&
      Data.password2 !== ""
    ) {
      axios
        .post("/admin_register/add", Data, config)
        .then((result) => {
          if (result.data.success === false) {
            return setErrors({ ...errors, email: result.data.error });
          }
          localStorage.setItem("authToken", result.data);
          navigate("/");
        })
        .catch(() => {});
    }
  };

  return { handleChange, handleSubmit, values, errors };
};

export default useSignIn;
