export default function validateInfo(values) {
  let errors = {};

  // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
  //   errors.name = 'Enter a valid name';
  // }

  if (!values.hauptCategories) {
    errors.hauptCategories = "Haupt Categories is required";
  }
  if (!values.subCategory) {
    errors.subCategory = "Sub Category is required";
  }
  if (!values.productName) {
    errors.productName = "ProductName is required";
  }
  if (!values.productBarcode) {
    errors.productBarcode = "Product Barcode is  required";
  }

  if (!values.fileUpload) {
    errors.fileUpload = "Image is required";
  }

  return errors;
}
