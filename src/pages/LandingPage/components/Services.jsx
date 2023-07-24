// import React from 'react'

import { Col, Row } from "antd";
import IMAGES from "../../../assets/images";

export default function Services() {
  const servicesData = [
    {
      tilte: "Eliminate Hand written Medication Lists",
      description:
        "Patients and families deserve to have upto date, mobile access to their latest medication list. ",
    },
    {
      tilte: "Empower the families you serve",
      description:
        "Patients and families deserve to have upto date, mobile access to their latest medication list. ",
    },
    {
      tilte: "Access to important documents",
      description:
        "Patients and families deserve to have upto date, mobile access to their latest medication list. ",
    },
    {
      tilte: "Keep other family members in the loop",
      description:
        "Patients and families deserve to have upto date, mobile access to their latest medication list. ",
    },
  ];
  return (
    <div className="container services py-5 border-bottom">
      <Row gutter={16} className="justify-content-center ">
        <Col
          xl={12}
          lg={12}
          md={24}
          sm={24}
          xs={24}
          className="align-self-center"
        >
          <div className="services-image mb-2">
            <img
              alt="services"
              src={IMAGES.SERVICES}
              className="img-fluid h-100"
            />
          </div>
        </Col>
        <Col xl={12} lg={12} md={24} sm={24} xs={24}>
          <div className="pt-5">
            <div className="service-head">OUR AMAZING SERVICES</div>
            <div className="service-main-title">
              Engage the families you serve
            </div>
            <div className="mb-1">
              <img alt="bar" src={IMAGES.BARS} width={30} />
            </div>
            {servicesData.map((item) => (
              <div className="mb-4">
                <div className="service-title">{item.tilte.toUpperCase()}</div>
                <div className="service-description">{item.description}</div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
