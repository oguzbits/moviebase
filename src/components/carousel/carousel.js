import React from "react";
import moment from "moment";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
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
        {/* <div className="card-wrapper"> */}
        {props.items.map(item => (
          <Link
            to={`/details/${props.type.toLowerCase()}/${item.id}`}
            key={item.id}
            id="card-container"
            className="card">
            <div id="card-grid">
              <div className="card">
                <img src={imageSource(item)} className="card-img" alt="..." />
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    <div>
                      <CircularProgressbar
                        className="circularprogressbar"
                        styles={buildStyles({
                          textSize: "45px",
                          pathColor: `${pathTrailColor(item.vote_average)}`,
                          textColor: "#fff",
                          trailColor: "black",
                          backgroundColor: "black"
                        })}
                        strokeWidth={10}
                        background
                        backgroundPadding={6}
                        value={item.vote_average * 10}
                        text={<tspan dy={2.5}>{item.vote_average * 10}</tspan>}
                      />
                    </div>
                    <div>{item.title || item.name}</div>
                  </div>
                  <p
                    className="card-text"
                    style={({ minHeight: "85px" }, { maxHeight: "85px" })}>
                    {item.overview.length > 200
                      ? `${item.overview.substring(0, 200)}...`
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
