import { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Input,
  Row,
  Select,
  DatePicker,
} from "antd";
import { IoIosArrowBack, IoIosLock, IoIosArrowDown } from "react-icons/io";
import { BiErrorCircle } from "react-icons/bi";
import { TbAddressBook } from "react-icons/tb";
import { TfiEmail } from "react-icons/tfi";
import { RiBarcodeLine } from "react-icons/ri";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { Formik } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import IMAGES from "../../../assets/images";

function Index() {
  const [phone, setPhone] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleSelectChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div className="register-genetic-kit-parent pt-3 bg-white px-5">
      <div className="w-100">
        <img
          src={IMAGES.LOGIN_LOGO}
          className="login-logo-img"
          alt="login main"
        />
      </div>
      <Row className="m-0" gutter={24}>
        <Col xs={16}>
          <div className="page-title d-flex align-items-center mb-3">
            <IoIosArrowBack className="mr-3" /> Register Genetic Kit
          </div>
          <Card className="bg-gray">
            <div className="d-flex align-items-center">
              <BiErrorCircle size={55} className="mr-3" />
              <div className="fs-warning text-black fw-heavy">
                Privacy and anonymity of your personal data is a top priority
                for us. Your data can only be identified by the barcode
                registered to your kit, all personal information resides on a
                separate database. Therefore, it is essential that you register
                the kit accurately.
              </div>
            </div>
          </Card>
          <Formik
            initialValues={{
              email: "",
              name: "",
              password: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
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
                <Row gutter={12}>
                  <Col xs={10}>
                    <div className="d-flex align-items-center my-2">
                      <Checkbox />
                      <div className="ml-2 fs-sm text-black mb-0">
                        I followed sampling instructions.
                      </div>
                    </div>
                  </Col>
                  <Col xs={14}>
                    <div className="d-flex align-items-center my-2">
                      <Checkbox />
                      <div className="ml-2 fs-sm text-black mb-0">
                        I followed sampling instructions.
                      </div>
                    </div>
                  </Col>
                  <Col xs={10}>
                    <div className="d-flex align-items-center my-2">
                      <Checkbox />
                      <div className="ml-2 fs-sm text-black mb-0">
                        I recorded my barcode number.
                      </div>
                    </div>
                  </Col>
                  <Col xs={14}>
                    <div className="d-flex align-items-center my-2">
                      <Checkbox />
                      <div className="ml-2 fs-sm text-black mb-0">
                        I placed the vial with swab into the shipping package.
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row gutter={12}>
                  <Col lg={8}>
                    <div className="labels mt-3">Your name</div>
                    <Input
                      placeholder="Enter your full name"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      prefix={<TbAddressBook size={18} className="mr-2" />}
                    />
                    <div className="text-danger">
                      {errors.name && touched.name && errors.name}
                    </div>
                  </Col>
                  <Col lg={8}>
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
                  </Col>
                  <Col lg={8}>
                    <div className="labels mt-3">Phone Number</div>
                    <PhoneInput
                      country="us"
                      value={phone}
                      onChange={(phoneNo) => setPhone(phoneNo)}
                    />
                    <div className="text-danger">
                      {errors.email && touched.email && errors.email}
                    </div>
                  </Col>
                  <Col lg={8}>
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
                  </Col>
                  <Col lg={8}>
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
                  </Col>
                  <Col lg={8}>
                    <div className="labels mt-3">Gender</div>
                    <Select
                      suffixIcon={
                        <IoIosArrowDown size={28} className="text-gray" />
                      }
                      defaultValue="Male"
                      className="w-100"
                      onChange={handleSelectChange}
                      options={[
                        {
                          value: "male",
                          label: "Male",
                        },
                        {
                          value: "female",
                          label: "Female",
                        },
                      ]}
                    />
                  </Col>
                  <Col lg={8}>
                    <div className="labels mt-3">Date of Birth</div>
                    <DatePicker className="w-100" onChange={onChange} />
                  </Col>
                  <Col lg={8}>
                    <div className="labels mt-3">Your Coach (Optional)</div>
                    <Select
                      suffixIcon={
                        <IoIosArrowDown size={28} className="text-gray" />
                      }
                      placeholder="Select your coach"
                      defaultValue="Male"
                      className="w-100"
                      onChange={handleSelectChange}
                      options={[
                        {
                          value: "male",
                          label: "Male",
                        },
                        {
                          value: "female",
                          label: "Female",
                        },
                      ]}
                    />
                  </Col>
                  <Col lg={8}>
                    <div className="labels mt-3">Barcode</div>
                    <Input prefix={<RiBarcodeLine />} className="w-100" />
                  </Col>
                </Row>
                <div className="d-flex align-items-center my-3">
                  <Checkbox />
                  <div className="ml-2  text-black mb-0">
                    I consent to having this website store my submitted
                    information so they can respond to my inquiry.
                  </div>
                </div>
                <div className="d-flex align-items-start my-3">
                  <Checkbox />
                  <div className="ml-2  text-black mb-0">
                    I certify that I am submitting my own personal sample and am
                    over the age of 18 or I am the parent/guardian of the
                    individual whose sample is being submitted. I also certify
                    that I have read and understand the privacy policy and
                    consent to generating raw data from the sample that I am
                    submitting.
                  </div>
                </div>
                <Button type="submit" className="px-4" disabled={isSubmitting}>
                  <div className="">Register</div>
                </Button>
              </form>
            )}
          </Formik>
        </Col>
        <Col xs={8}>
          <Card className="bg-light-blue px-2">
            <div className="page-title text-primary fw-bold mt-2">
              Instructions
            </div>
            <Card className="bg-blue mt-3">
              <div className="fs-warning fw-heavy">
                Please follow the steps below to obtain a valid sample. Once
                complete, fill out the required information and double check to
                ensure accuracy.
              </div>
            </Card>
            <ol className="fw-heavy">
              <li className="mt-2">
                (Optional) Rinse your mouth with water and then wait 30 minutes.
              </li>
              <li className="mt-2">
                DO NOT eat, drink, brush teeth, smoke, or chew gum 30 minutes
                prior to the sample.
              </li>
              <li className="mt-2">
                Remove the HydraFlock® swab from the sterile container – ensure
                the seal is intact.
              </li>
              <li className="mt-2">
                Rub and rotate the swab on the inside of each cheek, 10 times
                each side.
              </li>
              <li className="mt-2">
                Submerge the swab in the vial preservative liquid and break off
                the stick at perforation.
              </li>
              <li className="mt-2">
                IMPORTANT – Register your kit and be sure to record the number
                located on the vial and on the back of the box. This number is
                the only way we have to identify your sample. If it is not
                recorded correctly, we will not be able to provide you with your
                results. We recommend you take a picture of the number on the
                vial, it is also located on the outside of your box.
              </li>
              <li className="mt-2">
                Place the vial into the prepaid shipping package.
              </li>
              <li className="mt-2">Drop the package in the mail.</li>
              <li className="mt-2">
                {" "}
                Receive your results via email in approximately 14-21 business
                days.
              </li>{" "}
              <li className="mt-2">
                International orders will not include pre-paid return postage.
                Please post your sample following instructions included in your
                parcel.
              </li>
            </ol>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Index;
