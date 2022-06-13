export default function validateInfo(values) {
  let errors = {};
  let noErrors = true;

  if (!values.name) {
    errors.name = "Name required";
    noErrors = false;
  }
  // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
  //   errors.name = 'Enter a valid name';
  // }

  if (!values.email) {
    errors.email = "Email required";
    noErrors = false;
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
    noErrors = false;
  }
  if (!values.password) {
    errors.password = "Password is required";
    noErrors = false;
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
    noErrors = false;
  }

  if (!values.password2) {
    errors.password2 = "Password is required";
    noErrors = false;
  } else if (values.password2 !== values.password) {
    errors.password2 = "Passwords do not match";
    noErrors = false;
  }
  if (noErrors) errors.noErros = true;
  else errors.noErros = false;

  return errors;
}
