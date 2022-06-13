import React from "react";
import "./Login.css";
import useLogin from "./useLogin";
import LoginValdiate from "./LoginValidateinfo";
import SignIn from "./signin-image.png";
import { AiTwotoneMail, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Login = () => {
  const { handleChange, handleSubmit, values, errors } =
    useLogin(LoginValdiate);
  return (
    <div className="login-background">
      <div class="container">
        <div class="signin-content">
          <div class="signin-image">
            <img src={SignIn} alt="sing up image" />
            <Link to="/SignIn"> Create an account</Link>
          </div>
          <div class="signin-form">
            <h2 class="form-title">Sign up</h2>
            <form
              class="register-form"
              id="login-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div class="form-group">
                <label className={errors.email ? "Label active" : "Label"}>
                  <AiTwotoneMail />
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
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
                  id="your_pass"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && <p>{errors.password}</p>}
              </div>
              <div class="form-group">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  class="agree-term"
                />
                <label for="remember-me" class="label-agree-term">
                  <span>
                    <span></span>
                  </span>
                  Remember me
                </label>
              </div>
              <div class="form-group form-button">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  class="form-submit"
                  value="Log in"
                />
              </div>
            </form>
            <div class="social-login">
              <span class="social-label">Or login with</span>
              <ul class="socials">
                <li>
                  <a href="#">
                    <i class="display-flex-center zmdi zmdi-facebook">
                      <BsFacebook />
                    </i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="display-flex-center zmdi zmdi-twitter">
                      <AiOutlineTwitter />
                    </i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="display-flex-center zmdi zmdi-google">
                      <BsGoogle />
                    </i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
