// import React from 'react'

import { Col, Row } from "antd";
import IMAGES from "../../../assets/images";

export default function Vission() {
  const VissionData = [
    {
      icon: <img alt="mesg" src={IMAGES.MESSAGE} width={30} />,
      title: "Messaging",
      description: "Direct and group message your team",
    },
    {
      icon: <img alt="mesg" src={IMAGES.MEDICATION} width={30} />,
      title: "Medication",
      description: "Direct and group message your team",
    },
    {
      icon: <img alt="mesg" src={IMAGES.SCHEDULE} width={30} />,
      title: "Schedule",
      description:
        "Transparent Schedule for all team members on shared calendars with mobile access ",
    },
    {
      icon: <img alt="mesg" src={IMAGES.COMPLIANCE} width={30} />,
      title: "Compliance",
      description: "Direct and group message your team",
    },
    {
      icon: <img alt="mesg" src={IMAGES.TRACK_VISIT} width={30} />,
      title: "Track Visit",
      description: "Direct and group message your team",
    },
  ];
  return (
    <div className="container py-5 border-bottom vission">
      <Row className="justify-content-between text-sm-center px-5" gutter={0}>
        {VissionData.map((item) => (
          <Col xl={3} lg={3} md={12} sm={12} xs={24}>
            <div className="d-flex flex-column align-items-center text-center mb-2">
              <span className="vission-icon">{item.icon}</span>
              <span className="vission-title pt-3">{item.title}</span>
              <span className="vission-description">{item.description}</span>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
