import React from "react";

import SignInImgae from "./SignIn.png";
import useSignIn from "./UseSignin";
import SiginValidate from "./SignInValidate";
import { FaUserAlt } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
const SignIn = () => {
  const { handleChange, handleSubmit, values, errors } = useSignIn(
    SiginValidate
  );
  return (
    <div className="login-background">
      <div class="container">
        <div class="signup-content">
          <div class="signup-form">
            <h2 class="form-title">Sign up</h2>
            <form
              method="POST"
              class="register-form"
              id="register-form"
              onSubmit={handleSubmit}
            >
              <div class="form-group" noValidate>
                <label className={errors.name ? "Label active" : "Label"}>
                  <FaUserAlt />
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  value={values.name}
                  onChange={handleChange}
                />
                {errors.name && <p>{errors.name}</p>}
              </div>
              <div class="form-group">
                <label className={errors.email ? "Label active" : "Label"}>
                  <AiTwotoneMail />
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div class="form-group">
                <label className={errors.password ? "Label active" : "Label"}>
                  <RiLockPasswordLine />
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && <p>{errors.password}</p>}
              </div>

              <div class="form-group">
                <label className={errors.password2 ? "Label active" : "Label"}>
                  <RiLockPasswordLine />
                </label>
                <input
                  type="password"
                  name="password2"
                  id="password2"
                  placeholder="Repeat your password"
                  value={values.password2}
                  onChange={handleChange}
                />
                {errors.password2 && <p>{errors.password2}</p>}
              </div>

              <div class="form-group">
                <input
                  type="checkbox"
                  name="agree-term"
                  id="agree-term"
                  class="agree-term"
                />
                <label for="agree-term" class="label-agree-term">
                  <span>
                    <span></span>
                  </span>
                  I agree all statements in{" "}
                  <a href="#" class="term-service">
                    Terms of service
                  </a>
                </label>
              </div>
              <div class="form-group form-button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  class="form-submit"
                  value="Register"
                />
              </div>
            </form>
          </div>
          <div class="signup-image">
            <img src={SignInImgae} alt="sing up image" />
            <a href="#" class="signup-image-link">
              I am already member
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
