// import React from "react";

import { Button, Card, Col, Form, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import IMAGES from "../../../assets/images";

export default function ContactUs() {
  const contactData = [
    {
      icon: <img alt="phone" src={IMAGES.PHONE} width={30} />,
      info: "+921234567890",
    },
    {
      icon: <img alt="phone" src={IMAGES.POINTER} width={30} />,
      info: "+921234567890",
    },
    {
      icon: <img alt="phone" src={IMAGES.ENVELOP} width={30} />,
      info: "+921234567890",
    },
  ];
  const socialIcon = [
    {
      icon: <img alt="phone" src={IMAGES.FACEBOOK} width={40} />,
    },
    {
      icon: <img alt="phone" src={IMAGES.TWITTER} width={40} />,
    },
    {
      icon: <img alt="phone" src={IMAGES.INSTAGRAM} width={40} />,
    },
    {
      icon: <img alt="phone" src={IMAGES.YOUTUBE} width={40} />,
    },
  ];

  return (
    <div className="container py-5 ">
      <Row gutter={16} className="justify-content-center contact">
        <Col xl={8} lg={8} md={24} sm={24} xs={24}>
          <div className="contact-main">STAY IN TOUCH</div>
          <div className="contact-heading">Contact Us</div>
          <img alt="bar" src={IMAGES.BARS} width={30} />
          {contactData.map((item) => (
            <div className="py-4">
              <span>{item.icon}</span>
              <span className="ml-4">{item.info}</span>
            </div>
          ))}
          <div className="d-flex py-4 social-icon">
            {socialIcon.map((item) => (
              <span className=" mx-2">{item.icon}</span>
            ))}
          </div>
        </Col>
        <Col xl={12} lg={12} md={24} sm={24} xs={24} className="mt-4">
          <Card className="shadow-sm py-4 px-2">
            <Row gutter={16}>
              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Form.Item name="username" className="mb-3">
                  <Input placeholder="Name" size="large" />
                </Form.Item>
                <Form.Item name="username" className="mb-3">
                  <Input placeholder="Email" size="large" />
                </Form.Item>
                <Form.Item name="username" className="mb-3">
                  <Input placeholder="Message" size="large" />
                </Form.Item>
              </Col>
              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Form.Item>
                  <TextArea rows={7} placeholder="Message" />
                </Form.Item>
              </Col>
            </Row>
            <div className="text-right py-2">
              <Button type="primary">Send Message</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
