import { Grid } from "@mui/material";

import { styled } from "@mui/system";
import SimpleCard from "./Components/SimpleCard";
import { Button } from "@mui/material";
import "./AddItems.css";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";

import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";

import React, { useState, useEffect } from "react";
import useAddItems from "./useAddItems";
import AddItemsValdiate from "./AddItemsValdiate";
import { useAxiosGet } from "../Hooks/HttprRequeste";
import { useNavigate } from "react-router-dom";

import { Alert } from "@mui/material";

const Container = styled("div")(() => ({ margin: "30px" }));

function AddItems() {
  const navigate = useNavigate();
  let content = null;
  const [subCategoryitems, setSubCategoryitems] = useState([]);
  const [SnakbarStauts, setSnakbarStauts] = useState(false);

  const url1 = "/merchants/select-BasicCategory";

  let hauptCategories = useAxiosGet(url1);

  const {
    NumberOnly,
    handleChange,
    handleSubmit,
    getFileName,

    values,
    errors,
    Message,
    filename,
  } = useAddItems(AddItemsValdiate);

  useEffect(() => {
    if (values.hauptCategories !== "") {
      const config = {
        header: { "Content-Type": "application/json" },
      };
      const handleSelectValue = async (e) => {
        const Data = {
          categoryNameBasic: values.hauptCategories,
        };
        const result = await axios.get(
          "/merchants/selectSubCategory",
          Data,
          config
        );

        result.data.map((item) => {
          setSubCategoryitems([item.subCategoryNameBasic]);
        });
      };
      handleSelectValue();
    }
  }, [values.hauptCategories]);

  if (hauptCategories.data) {
    let items = [];
    hauptCategories.data.map((item) => {
      items.push(item.categoryNameBasic);
    });

    content = (
      <SimpleCard title="Add Product">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
            setSubCategoryitems([]);
            setSnakbarStauts(true);
          }}
          noValidate
        >
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={items}
                name="hauptCategories1"
                value={values.hauptCategories}
                sx={
                  errors.hauptCategories
                    ? { width: "90%" }
                    : { width: "90%", marginBottom: "15px" }
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="HauptCategory"
                    InputLabelProps={{ style: { fontWeight: 999 } }}
                    value={values.hauptCategories}
                    name="hauptCategories"
                    onSelect={(e) => {
                      handleChange(e);
                    }}
                  />
                )}
              />
              <div className="errors">
                {errors.hauptCategories && <p>{errors.hauptCategories}</p>}
              </div>

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={subCategoryitems}
                sx={
                  errors.hauptCategories
                    ? { width: "90%" }
                    : { width: "90%", marginBottom: "15px" }
                }
                value={values.subCategory}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="SubCategory"
                    InputLabelProps={{ style: { fontWeight: 999 } }}
                    value={values.subCategory}
                    name="subCategory"
                    onSelect={(e) => {
                      handleChange(e);
                    }}
                  />
                )}
              />
              <div className="errors">
                {errors.subCategory && <p>{errors.subCategory}</p>}
              </div>

              <TextField
                id="outlined-basic"
                label="Product Name"
                variant="outlined"
                InputLabelProps={{ style: { fontWeight: 999 } }}
                value={values.productName}
                name="productName"
                sx={
                  errors.productName
                    ? { width: "90%" }
                    : { width: "90%", marginBottom: "15px" }
                }
                onChange={handleChange}
              />
              <div className="errors">
                {errors.productName && <p>{errors.productName}</p>}
              </div>

              <TextField
                id="outlined-basic"
                label="Product Barcode"
                variant="outlined"
                InputLabelProps={{ style: { fontWeight: 999 } }}
                InputProps={{ style: { fontWeight: 999 } }}
                value={values.productBarcode}
                name="productBarcode"
                sx={
                  errors.productBarcode
                    ? { width: "90%" }
                    : { width: "90%", marginBottom: "15px" }
                }
                onChange={handleChange}
                onKeyPress={NumberOnly}
              />
              <div className="errors">
                {errors.productBarcode && <p>{errors.productBarcode}</p>}
              </div>

              <div
                className={
                  errors.fileUpload ? "custom-file-error" : "custom-file"
                }
              >
                <input
                  type="file"
                  className="custom-file-input Errors"
                  id="customFile"
                  name="fileUpload"
                  onChange={(e) => {
                    getFileName(e);
                  }}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {filename}
                </label>
              </div>
              <div className="errors">
                {errors.fileUpload && <p>{errors.fileUpload}</p>}
              </div>
              <TextField
                id="outlined-multiline-static"
                label="product Description"
                multiline
                rows={4}
                sx={{ width: "90%", marginBottom: "15px" }}
                InputLabelProps={{ style: { fontWeight: 999 } }}
                InputProps={{ style: { fontWeight: 999 } }}
                value={values.productDescription}
                name="productDescription"
                onChange={handleChange}
              />
              <div className="errors">
                {errors.productDescription && (
                  <p>{errors.productDescription}</p>
                )}
              </div>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            type="submit "
            style={{ fontWeight: 999 }}
          >
            Add Product
          </Button>
        </form>
        <div>
          <Snackbar
            open={SnakbarStauts}
            autoHideDuration={6000}
            onClose={(event, reason, key) => {
              if (reason === "clickaway") {
                this.ref.closeSnackbar(key);
              }
              setSnakbarStauts(false);
              // ...
            }}
          >
            <Alert variant="filled" severity="success" sx={{ fontWeight: 999 }}>
              {Message.success}
            </Alert>
          </Snackbar>
        </div>
      </SimpleCard>
    );
  }

  return (
    <Container>
      {" "}
      {localStorage.getItem("authToken") ? content : navigate("/")}
    </Container>
  );
}

export default AddItems;
