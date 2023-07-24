/ eslint-disable no-use-before-define /;

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import Select from "react-select";
import IMAGES from "../../../../assets/images";
import {
  getPhysicianProfile,
  updatePhysicianProfile,
} from "../../../../app/features/physician/physician.slice";
import ToastifyFunc from "../../../../utils/Toastify";
import LoadingSpinner from "../../../../components/Loader/Spinner";
import FullScreenLoader from "../../../../components/Loader/FullScreenLoader";
import { convertBase64, datePickerMinDate } from "../../../../utils/helpers";
import commonService from "../../../../app/features/common/common.service";
import { LOOKUP_TYPES } from "../../../../utils/lookup";
import { updateUser } from "../../../../app/features/auth/auth.slice";
import {
  getCityList,
  getCountryList,
  getStateList,
} from "../../../../app/features/common/common.slice";
import { getLookupByType } from "../../../../app/features/lookup/lookup.slice";

export default function Basic({ activeTab }) {
  const { uploadAssetOnCloud } = commonService;
  const [updateProfilePicture, setupdateProfilePicture] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { gender, isGetLookupLoading, doctorSpecialityType } = useSelector(
    (state) => state.lookup
  );
  const {
    physicianProfile,
    isGetPhysicianProfileLoading,
    isUpdatePhysicianProfileLoading,
  } = useSelector((state) => state.physician);

  const {
    countryList,
    isGetCountryListLoading,
    stateList,
    isGetStateListLoading,
    cityList,
    isGetCityListLoading,
  } = useSelector((state) => state.common);

  useEffect(() => {
    if (activeTab === "basic") {
      dispatch(getPhysicianProfile(user.userId));
      dispatch(getCountryList());
      dispatch(getLookupByType(LOOKUP_TYPES.GENDER));
      dispatch(getLookupByType(LOOKUP_TYPES.DOCTOR_SPECIALITIES));
    }
  }, [activeTab]);

  useEffect(() => {
    if (physicianProfile) {
      if (physicianProfile?.stateId) changeCountry(physicianProfile?.countryId);
      if (physicianProfile?.cityId) changeState(physicianProfile?.stateId);
    }
  }, [physicianProfile]);

  const initialValues = {
    firstName: physicianProfile?.firstName || "",
    lastName: physicianProfile?.lastName || "",
    genderId: physicianProfile?.genderId || "",
    email: physicianProfile?.email || "",
    countryId: physicianProfile?.countryId || "",
    stateId: physicianProfile?.stateId || "",
    cityId: physicianProfile?.cityId || "",
    location: physicianProfile?.location || "",
    phoneNumber: physicianProfile?.phoneNumber || "",
    dob: physicianProfile?.dob?.split("T")?.[0] || "",
    patientId: physicianProfile?.patientId || user?.userId,
    image: physicianProfile?.image || "",
    bio: physicianProfile?.bio || "",
    speciialities:
      physicianProfile?.specialities?.map((item) => ({
        value: item?.name,
        lookupId: item?.id,
      })) || [],
  };

  const profileSchema = Yup.object().shape({
    firstName: Yup.string().required("Required") || "",
    lastName: Yup.string().required("Required") || "",
    genderId: Yup.string().required("Required") || "",
    email: Yup.string().email("Invalid Email").required("Required") || "",
    countryId: Yup.string().required("Required") || "",
    stateId: Yup.string().required("Required") || "",
    cityId: Yup.string().required("Required") || "",
    location: Yup.string().required("Required") || "",
    phoneNumber: Yup.string().required("Required") || "",
    dob:
      Yup.date()
        .max(new Date(), "Date can't be greater than Current Date")
        .required("Required")
        .nullable() || "",
    bio: Yup.string().required("Required") || "",
    speciialities:
      Yup.array() ||
      // .min(1, "Required")
      [],
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (formValues, { setSubmitting }) => {
      try {
        formValues = {
          ...formValues,
          speciialities: formValues.speciialities.map((item) => item.lookupId),
        };
        if (updateProfilePicture) {
          setSubmitting(true);
          const splitImageSrc = updateProfilePicture.split(";");
          const imageBase64 = splitImageSrc[1].split(",")?.[1];
          const extention = splitImageSrc[0].split(":")?.[1];
          const obj = {
            name: "ProfilePicture",
            base64: imageBase64,
            fileExtension: extention,
          };
          const { keyName } = await uploadAssetOnCloud(obj);
          formValues = { ...formValues, image: keyName };
        }
        const callBackFunc = (msg, type) => {
          setupdateProfilePicture(null);
          ToastifyFunc(msg, type);
          dispatch(updateUser());
        };
        dispatch(
          updatePhysicianProfile({
            req: formValues,
            callBack: callBackFunc,
          })
        );
        setSubmitting(false);
      } catch (err) {
        console.log("err", err);
      }
    },
    validationSchema: profileSchema,
  });

  const chooseProfilePicture = (picture) => {
    const file = picture.target.files[0];
    convertBase64(file).then((base64) => {
      setupdateProfilePicture(base64);
    });
  };
  const changeCountry = (id, clear = false) => {
    dispatch(getStateList(id));
    if (clear) {
      setFieldValue("stateId", "");
      setFieldValue("cityId", "");
    }
  };
  const changeState = (id, clear = false) => {
    dispatch(getCityList(id));
    if (clear) setFieldValue("cityId", "");
  };

  return (
    <>
      {(isGetPhysicianProfileLoading ||
        isGetCountryListLoading ||
        isGetStateListLoading ||
        isGetCityListLoading) && <FullScreenLoader forRequest="true" />}
      <Row>
        <Col xl={4}>
          <Card className="mb-4 mb-xl-0">
            <Card.Header> Profile Picture</Card.Header>
            <Card.Body className="text-center">
              <img
                className="img-account-profile rounded-circle mb-2"
                src={
                  updateProfilePicture ||
                  physicianProfile?.imageBaseURL ||
                  IMAGES.USER_AVATAR
                }
                alt="user-img"
              />
              <div className="small font-italic text-muted mb-2">
                JPG or PNG no larger than 5 MB
              </div>
              {updateProfilePicture && (
                <small className="text-danger d-block mb-2">
                  Click on save changes to upload
                </small>
              )}
              <Button className="mx-auto position-relative" type="button">
                Upload new image
                <Form.Control
                  className="opacity-0 position-absolute"
                  type="file"
                  onChange={chooseProfilePicture}
                  accept="image/*"
                />
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={8} className="mt-sm-4 mt-lg-0">
          <Card className="mb-4">
            <Card.Header>Personal Information</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                      />
                      {errors.firstName && touched.firstName ? (
                        <div className="field-error">{errors.firstName}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your last name"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                      />
                      {errors.lastName && touched.lastName ? (
                        <div className="field-error">{errors.lastName}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>

                      <Form.Select
                        className="form-control"
                        name="genderId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.genderId}
                        disabled={isGetLookupLoading}
                      >
                        <option hidden>Select Your Gender</option>
                        {gender.map((item) => (
                          <option value={item.lookupId}>{item.value}</option>
                        ))}
                      </Form.Select>
                      {errors.genderId && touched.genderId ? (
                        <div className="field-error">{errors.genderId}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    mailto:placeholder="name@example.com"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    readOnly
                  />
                </Form.Group>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        className="form-control"
                        name="countryId"
                        onChange={(e) => {
                          handleChange(e);
                          changeCountry(e.target.value, true);
                        }}
                        onBlur={handleBlur}
                        value={values.countryId}
                      >
                        <option hidden>Select Country</option>
                        {countryList.map((item) => (
                          <option value={item.countryId}>{item.name}</option>
                        ))}
                      </Form.Select>
                      {errors.countryId && touched.countryId ? (
                        <div className="field-error">{errors.countryId}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>State</Form.Label>
                      <Form.Select
                        className="form-control"
                        name="stateId"
                        onChange={(e) => {
                          handleChange(e);
                          changeState(e.target.value, true);
                        }}
                        onBlur={handleBlur}
                        value={values.stateId}
                      >
                        <option hidden>Select State</option>
                        {stateList.map((item) => (
                          <option value={item.stateId}>{item.name}</option>
                        ))}
                      </Form.Select>
                      {errors.stateId && touched.stateId ? (
                        <div className="field-error">{errors.stateId}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Select
                        className="form-control"
                        name="cityId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.cityId}
                      >
                        <option hidden>Select City</option>
                        {cityList.map((item) => (
                          <option value={item.cityId}>{item.name}</option>
                        ))}
                      </Form.Select>
                      {errors.cityId && touched.cityId ? (
                        <div className="field-error">{errors.cityId}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Location"
                    name="location"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.location}
                  />
                  {errors.location && touched.location ? (
                    <div className="field-error">{errors.location}</div>
                  ) : null}
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="555-123-4567"
                        name="phoneNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phoneNumber}
                      />
                      {errors.phoneNumber && touched.phoneNumber ? (
                        <div className="field-error">{errors.phoneNumber}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Birthday</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="555-123-4567"
                        name="dob"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.dob}
                        max={datePickerMinDate()}
                      />
                      {errors.dob && touched.dob ? (
                        <div className="field-error">{errors.dob}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Bio</Form.Label>
                      <Form.Control
                        name="bio"
                        placeholder="Enter Bio"
                        as="textarea"
                        rows="5"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.bio}
                      />
                      {errors.bio && touched.bio ? (
                        <div className="field-error">{errors.bio}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Specialities</Form.Label>
                      <Select
                        value={values.speciialities}
                        isMulti
                        name="speciialities"
                        options={doctorSpecialityType}
                        getOptionLabel={(option) => option.value}
                        getOptionValue={(option) => option.lookupId}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(selectedOption) => {
                          const event = {
                            target: {
                              name: "speciialities",
                              value: selectedOption,
                            },
                          };
                          handleChange(event);
                        }}
                      />
                      {errors.speciialities && touched.speciialities ? (
                        <div className="field-error">
                          {errors.speciialities}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  className="float-end"
                  disabled={isUpdatePhysicianProfileLoading || isSubmitting}
                >
                  {(isUpdatePhysicianProfileLoading || isSubmitting) && (
                    <LoadingSpinner size="sm" />
                  )}
                  Save changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

Basic.propTypes = {
  activeTab: PropTypes.node.isRequired,
};
