import { useState } from "react";
import axios from "axios";

const useAddItems = (validate) => {
  const [values, setValues] = useState({
    hauptCategories: "",
    subCategory: "",
    productName: "",
    fileUpload: null,
    productBarcode: "",
    productDescription: "",
  });

  const [filename, setFilename] = useState("Choose File");
  const [Message, setMessage] = useState({
    success: "",
    errors: "",
    open: false,
  });

  const [errors, setErrors] = useState([]);

  const configData = {
    header: { "Content-Type": "multipart/form-data" },
  };
  const config = {
    header: { "Content-Type": "application/json" },
  };

  const NumberOnly = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const getFileName = (e) => {
    setFilename(e.target.files[0].name);

    setValues({
      ...values,
      fileUpload: e.target.files[0],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(validate(values));

    const formData = new FormData();

    formData.append("subCategoryNameBasic", values.subCategory);
    formData.append("productName", values.productName);
    formData.append("productImages", values.fileUpload);
    formData.append("productBarcode", values.productBarcode);
    formData.append("productDescription", values.productDescription);

    if (
      values.subCategory !== "" &&
      values.productName !== "" &&
      values.fileUpload !== null &&
      values.productBarcode !== ""
    ) {
      await axios
        .post("/merchants/add-product", formData, configData)
        .then((result) => {
          setMessage({ success: "chicken", open: true });
        })
        .catch((error) => {
          console.log(Message.success + Message.open);
          console(error);

          // setMessage({ error: "chicken" + errors });
        });
      setValues({
        hauptCategories: "",
        subCategory: "",
        productName: "",
        fileUpload: "",
        productBarcode: "",
        productDescription: "",
      });
      setFilename("Choose File");
    }
  };

  return {
    NumberOnly,
    handleSubmit,
    handleChange,
    getFileName,
    setMessage,

    values,
    errors,
    Message,
    filename,
  };
};

export default useAddItems;
