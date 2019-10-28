import React from "react";
import moment from "moment";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

  const config = props.MDBConfig.images;

  return (
    <div className="carousel-main">
      <hr />
      <h4 className="carousel-title">{props.title.toUpperCase()}</h4>
      <Slider {...settings} style={{ textAlign: "center" }}>
        {/* <div className="card-wrapper"> */}
        {props.items.map(item => (
          <Link
            to={`/details/${props.type.toLowerCase()}/${item.id}`}
            key={item.id}
            id="card-container"
            className="card">
            <div id="card-grid">
              <div className="card">
                <img
                  src={`${
                    config
                      ? config.secure_base_url +
                        config.poster_sizes[2] +
                        item.poster_path
                      : ""
                  }`}
                  className="card-img"
                  alt="..."
                />
              </div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    {item.vote_average} | {item.title || item.name}
                  </h5>
                  <p
                    className="card-text"
                    style={({ minHeight: "85px" }, { maxHeight: "85px" })}>
                    {item.overview.length > 212
                      ? `${item.overview.substring(0, 212)}...`
                      : item.overview}
                  </p>
                </div>
                <div
                  id="footer-container"
                  className={
                    item.vote_average >= 7
                      ? "card-footer text-muted border-success"
                      : "card-footer text-muted border-warning"
                  }>
                  <div className="card-footer">
                    <small className="text-muted">
                      {moment(item.release_date || item.first_air_date).format(
                        "MMMM D, YYYY"
                      )}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {/* </div> */}
      </Slider>
    </div>
  );
};

export default Carousel;
