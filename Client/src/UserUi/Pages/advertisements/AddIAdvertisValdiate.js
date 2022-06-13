export default function validateInfo(values) {
  let errors = {};

  // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
  //   errors.name = 'Enter a valid name';
  // }

  if (!values.productName) {
    errors.productName = "Product Name is required";
  }

  console.log(!values.priceBeforeDiscount);
  if (!values.priceBeforeDiscount) {
    errors.priceBeforeDiscount = "price before discount is  required";
  }

  if (!values.priceAfterDiscount) {
    errors.priceAfterDiscount = "Price after discount is required";
  }

  return errors;
}
