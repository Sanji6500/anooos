import { useState } from "react";
import axios from "axios";

const useAddItems = (validate) => {
  const [values, setValues] = useState({
    AdvertisingEndDate: new Date().toISOString().slice(0, 10),
    AdvertisingStartDate: new Date().toISOString().slice(0, 10),
    productName: "",
    priceBeforeDiscount: "",
    priceAfterDiscount: "",
  });
  const [Message, setMessage] = useState({
    success: "",
    errors: "",
    SnakbarStauts: false,
  });

  const [errors, setErrors] = useState([]);
  const config = {
    header: { "Content-Type": "application/json" },
  };

  const NumberOnly = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleDateChange = (date, name) => {
    setValues({ ...values, [name]: date.toISOString().slice(0, 10) });
    console.log(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(validate(values));
    const Data = {
      priceBeforeDiscount: values.priceBeforeDiscount,
      priceAfterDiscount: values.priceAfterDiscount,
      productName: values.productName,
      advertisingEndDate: values.AdvertisingEndDate,
      advertisingStartDate: values.AdvertisingStartDate,
    };
    console.log(Data);

    if (
      values.productName !== "" &&
      values.priceBeforeDiscount !== "" &&
      values.priceAfterDiscount !== ""
    ) {
      await axios
        .post("/merchants/add-advertis", Data, config)
        .then((result) => {
          setMessage({ success: "anything but later", SnakbarStauts: true });
        })
        .catch((error) => {
          console.log("lol" + error);
        });
      setValues({
        AdvertisingEndDate: new Date(),
        AdvertisingStartDate: new Date(),
        productName: "",
        priceBeforeDiscount: "",
        priceAfterDiscount: "",
      });
    }
  };

  return {
    NumberOnly,
    handleSubmit,
    handleChange,
    handleDateChange,
    setMessage,

    values,
    errors,
    Message,
  };
};

export default useAddItems;
