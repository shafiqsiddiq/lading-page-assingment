/* eslint-disable react/no-unescaped-entities */
// import React from 'react'

// import { Slider } from "antd";
import Slider from "react-slick";
import IMAGES from "../../../assets/images";

export default function Heading() {
  const title =
    "Treaty health is the go-to system to improve your team's communication, while connecting you with the patients and families you serve";
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show multiple slides at once
    slidesToScroll: 1,
    variableHeight: true,
  };
  return (
    <div className="heading-bg border-bottom">
      <div className="heading-title pt-5">{title.toUpperCase()}</div>
      <div className="crousle">
        <Slider {...settings}>
          <div className="slider-slide">
            <img
              alt="slider-img"
              src={IMAGES.HOSPIC}
              className="img-fluid slider-image"
            />
          </div>
          <div className="slider-slide">
            <img
              alt="slider-img"
              src={IMAGES.HOSPIC}
              className="img-fluid slider-image"
            />
          </div>
          <div className="slider-slide">
            <img
              alt="slider-img"
              src={IMAGES.HOSPIC}
              className="img-fluid slider-image"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}
