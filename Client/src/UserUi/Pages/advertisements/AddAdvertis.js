import { Grid } from "@mui/material";

import { fontWeight, styled, width } from "@mui/system";
import SimpleCard from "./SimpleCard";
import { Button, Icon } from "@mui/material";
import "./AddIAdvertis.css";

import Snackbar from "@mui/material/Snackbar";

import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";

import React, { useState, useEffect } from "react";
import useAddAdd from "./useAddAd";

import { useAxiosGet } from "../Hooks/HttprRequeste";
import AddIAdvertisValdiate from "./AddIAdvertisValdiate";

import { Alert } from "@mui/material";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DatePicker } from "@mui/lab";
import { DataGrid } from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
const Container = styled("div")(() => ({ margin: "30px" }));
//---------------------------------------------------------

const columns = [
  { field: "productName", headerName: "Product Name", width: 150 },
  { field: "advertisingStartDate", headerName: "StartDate", width: 150 },
  {
    field: "advertisingEndDate",
    headerName: "Advertising End Date",
    width: 150,
  },
  {
    field: "priceBeforeDiscount",
    headerName: "Price Before Discount ",
    width: 150,
  },
  {
    field: "priceAfterDiscount",
    headerName: "Price After Discount ",
    width: 150,
  },
];

function AddItems() {
  const navigate = useNavigate();
  const url1 = "/merchants/getAllProducts";

  let getAllProducts = useAxiosGet(url1);

  const url123 = "/merchants/AlLAdvertis";

  let getAllAdevertis = useAxiosGet(url123);
  let content = null;

  const {
    handleChange,
    handleSubmit,
    NumberOnly,
    handleDateChange,
    setMessage,
    values,
    errors,
    Message,
  } = useAddAdd(AddIAdvertisValdiate);

  const [SnakbarStauts, setSnakbarStauts] = useState(false);

  if (getAllProducts.data && getAllAdevertis.data) {
    let items = [];
    getAllProducts.data.map((item) => {
      items.push(item.productName);
    });

    content = (
      <SimpleCard title="Add Product">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
            console.log(SnakbarStauts);
            setSnakbarStauts(true);
          }}
          noValidate
          autocomplete="off"
        >
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={items}
                name="productName"
                value={values.productName}
                sx={
                  errors.productName
                    ? { width: "90%" }
                    : { width: "90%", marginBottom: "20px" }
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ProductName"
                    InputLabelProps={{ style: { fontWeight: 999 } }}
                    value={values.productName}
                    name="productName"
                    onSelect={(e) => {
                      handleChange(e);
                    }}
                  />
                )}
              />
              <div className="errors">
                {errors.productName && <p>{errors.productName}</p>}
              </div>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  name="AdvertisingStartDate"
                  InputLabelProps={{ style: { fontWeight: 999 } }}
                  InputProps={{ style: { fontWeight: 999 } }}
                  value={values.AdvertisingStartDate}
                  onChange={(date) =>
                    handleDateChange(date, "AdvertisingStartDate")
                  }
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      // variant="Outlined"
                      id="mui-pickers-date"
                      label="Advertising Start Date"
                      sx={{ mb: "15px", width: "90%" }}
                      InputLabelProps={{ style: { fontWeight: 999 } }}
                    />
                  )}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  name="AdvertisingEndDate"
                  InputLabelProps={{ style: { fontWeight: 999 } }}
                  InputProps={{ style: { fontWeight: 999 } }}
                  value={values.AdvertisingEndDate}
                  onChange={(date) =>
                    handleDateChange(date, "AdvertisingEndDate")
                  }
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      // variant="Outlined"
                      id="mui-pickers-date"
                      label="Advertising End Date"
                      sx={{ mb: "15px", width: "90%" }}
                      InputLabelProps={{ style: { fontWeight: 999 } }}
                    />
                  )}
                />
              </LocalizationProvider>

              <TextField
                id="outlined-basic"
                label="Price Before Discount"
                variant="outlined"
                value={values.priceBeforeDiscount}
                name="priceBeforeDiscount"
                InputLabelProps={{ style: { fontWeight: 999 } }}
                InputProps={{ style: { fontWeight: 999 } }}
                sx={
                  errors.priceBeforeDiscount
                    ? { width: "90%" }
                    : { width: "90%", marginBottom: "15px" }
                }
                onChange={handleChange}
                onKeyPress={NumberOnly}
              />
              <div className="errors">
                {errors.priceBeforeDiscount && (
                  <p>{errors.priceBeforeDiscount}</p>
                )}
              </div>

              <TextField
                id="outlined-basic"
                label="Price After Discount"
                variant="outlined"
                InputLabelProps={{ style: { fontWeight: 999 } }}
                InputProps={{ style: { fontWeight: 999 } }}
                value={values.priceAfterDiscount}
                name="priceAfterDiscount"
                sx={
                  errors.priceAfterDiscount
                    ? { width: "90%" }
                    : { width: "90%", marginBottom: "15px" }
                }
                onChange={handleChange}
                onKeyPress={NumberOnly}
              />
              <div className="errors">
                {errors.priceAfterDiscount && (
                  <p>{errors.priceAfterDiscount}</p>
                )}
              </div>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
              <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  getRowId={(row) => row._id}
                  columns={columns}
                  rows={getAllAdevertis.data}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  sx={{ style: { fontWeight: 999 } }}
                />
              </Box>
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

        <Snackbar
          open={Message.SnakbarStauts}
          autoHideDuration={6000}
          InputLabelProps={{ style: { fontWeight: 999 } }}
          InputProps={{ style: { fontWeight: 999 } }}
          onClose={(event, reason, key) => {
            if (reason === "clickaway") {
              this.ref.closeSnackbar(key);
            }
            setMessage({ SnakbarStauts: false });
            // ...
          }}
        >
          <Alert variant="filled" severity="success" sx={{ fontWeight: 999 }}>
            {Message.success}
          </Alert>
        </Snackbar>
      </SimpleCard>
    );
  }

  return (
    <Container>
      {localStorage.getItem("authToken") ? content : navigate("/")}
    </Container>
  );
}

export default AddItems;
