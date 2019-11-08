import React from "react";
import Slider from "react-slick";

import CardItem from "../cardItem/cardItem";

import "react-circular-progressbar/dist/styles.css";
import "./carousel.scss";

const Carousel = props => {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 15000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1850,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 0
        }
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0
        }
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
        }
      }
    ]
  };

  const pathTrailColor = rating => {
    return rating >= 7
      ? `rgba(24, 201, 39, ${(rating * 10) / 100})`
      : `rgba(255, 208, 0, ${(rating * 10) / 100})`;
  };

  const config = props.MDBConfig.images;
  const imageSource = item => {
    return config
      ? config.secure_base_url + config.poster_sizes[0] + item.poster_path ||
          item.backdrop_path
      : "";
  };

  return (
    <div className="carousel-main">
      <hr />
      <h4 className="carousel-title">{props.title.toUpperCase()}</h4>
      <Slider {...settings} style={{ textAlign: "center" }}>
        {props.items.map((item, i) => (
          <div key={i}>
            <CardItem
              item={item}
              type={props.type}
              pathcolor={pathTrailColor(item.vote_average)}
              image={imageSource(item)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
