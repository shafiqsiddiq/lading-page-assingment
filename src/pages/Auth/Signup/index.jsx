import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Input, Row } from "antd";
import { Formik } from "formik";
import { TfiEmail } from "react-icons/tfi";
import { IoIosLock } from "react-icons/io";
import { TbAddressBook } from "react-icons/tb";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
// import IMAGES from "../../../assets/images";
import PATH from "../../../Navigation/Path";

function Index() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
      <Row className="auth-parent d-flex align-items-center justify-content-center">
        <Col xs={22} sm={20} md={16} lg={12} xl={7}>
          <Card className="m-0 login-card px-4">
            <div className="w-100 text-center ">
              {/* <img
                src={IMAGES.LOGIN_LOGO}
                className="login-logo-img"
                alt="login main"
              /> */}
               <p className="fs-lg fw-heavy text-black">UML Logo</p>
            </div>
            <div className="page-title fw-heavy text-black">Sign Up</div>
            <div>
              <Formik
                initialValues={{
                  fullName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
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
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="labels mt-3">Full Name</div>
                    <Input
                      placeholder="Enter your name"
                      type="text"
                      name="fullName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fullName}
                      prefix={<TbAddressBook size={18} className="mr-2" />}
                    />
                    <div className="text-danger">
                      {errors.fullName && touched.fullName && errors.fullName}
                    </div>
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
                    <div className="labels mt-3">Password</div>
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
                      {errors.password && touched.password && errors.password}
                    </div>
                    <div className="labels mt-3">Confirm Password</div>
                    <Input
                      placeholder="Enter same password"
                      name="confirmPassword"
                      type={`${showConfirmPassword ? "text" : "password"}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      prefix={<IoIosLock size={20} className="mr-2" />}
                      suffix={
                        showConfirmPassword ? (
                          <RxEyeOpen
                            size={14}
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          />
                        ) : (
                          <RxEyeClosed
                            size={14}
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          />
                        )
                      }
                    />
                    <div className="text-danger">
                      {errors.confirmPassword &&
                        touched.confirmPassword &&
                        errors.confirmPassword}
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-100 mt-4"
                    >
                      Create Account
                    </Button>
                    <div className="fs-xs mt-3 w-100 text-center">
                      <span className="text-secondary">
                        Already have account?
                      </span>
                      <span
                        className="text-primary ml-1 cursor-pointer"
                        role="presentation"
                        onClick={() => navigate(PATH.LOGIN)}
                      >
                        Sign In{" "}
                      </span>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </Card>
        </Col>
      </Row>
  );
}
export default Index;
