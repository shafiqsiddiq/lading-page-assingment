/* eslint-disable */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Checkbox, Col, Input, Row } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { TfiEmail } from "react-icons/tfi";
import { BsArrowRight } from "react-icons/bs";
import { IoIosLock } from "react-icons/io";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import IMAGES from "../../../assets/images";
import PATH from "../../../Navigation/Path";
import { useDispatch } from "react-redux";
import { login } from "../../../app/features/auth/auth.slice";

function Index() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
  });

  function notifyToaster(data, condition) {
    if (condition !== "success") {
      notification.error({
        message: data,
      });
    }
  }
  return (
    <>
      <Row className="auth-parent d-flex align-items-center justify-content-center">
        <Col xs={22} sm={20} md={18} lg={16} xl={12}>
          <Card className="m-0 login-card">
            <Row gutter={14}>
              <Col flex="auto" className="px-4 login-form">
                <div className="p-2 w-100 text-center ">
                  {/* <img
                    src={IMAGES.LOGIN_LOGO}
                    className="login-logo-img"
                    alt="login main"
                  /> */}
                  <p className="fs-lg fw-heavy text-black">UML Logo</p>
                </div>
                <div>
                <div className="page-title fw-heavy text-black">Sign In</div>
                <div>
                  <Formik
                    validationSchema={schema}
                    initialValues={{ email: "", password: "" }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.email) {
                        errors.email = "Required";
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          values.email
                        )
                      ) {
                        errors.email = "Invalid email address";
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      // Alert the input values of the form that we filled
                      dispatch(login({ values, notifyToaster }));
                      setSubmitting(false);
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      // isSubmitting,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="labels mt-3">Email Address</div>
                        <Input
                          placeholder="Enter email address"
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          prefix={<TfiEmail size={16} className="mr-2" />}
                        />
                        <div className="text-danger">
                          {errors.email && touched.email && errors.email}
                        </div>
                        <div className="d-flex align-items-baseline justify-content-between">
                          <div className="labels mt-3">Password</div>
                          <div className="mt-3 fs-xs text-primary">
                            Forget password?
                          </div>
                        </div>
                        <Input
                          placeholder="Enter password"
                          name="password"
                          type={`${showPassword ? "text" : "password"}`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          prefix={<IoIosLock size={20} className="mr-2" />}
                          suffix={
                            showPassword ? (
                              <RxEyeOpen
                                size={14}
                                onClick={() => setShowPassword(!showPassword)}
                              />
                            ) : (
                              <RxEyeClosed
                                size={14}
                                onClick={() => setShowPassword(!showPassword)}
                              />
                            )
                          }
                        />
                        <div className="text-danger">
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </div>
                        <div className="d-flex align-items-center my-2">
                          <Checkbox />
                          <div className="ml-2 labels mb-0">Remember me</div>
                        </div>
                        <button
                          type="submit"
                          // disabled={isSubmitting}
                          className="ant-btn ant-btn-submit w-100 mt-3"
                        >
                          Sign In
                        </button>
                        <div className="fs-xs mt-3 w-100 text-center">
                          <span className="text-secondary">
                            Don’t have account?
                          </span>
                          <span
                            role="presentation"
                            className="text-primary ml-1 cursor-pointer"
                            onClick={() => navigate(PATH.SIGN_UP)}
                          >
                            Create new account
                          </span>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
                </div>
              </Col>
              <Col flex="310px" className="d-lg-block d-none position-relative ">
                <img
                  src={IMAGES.LOGIN}
                  className="login-img"
                  alt="login main"
                />
                <div className="login-img-overlay"/>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Index;
