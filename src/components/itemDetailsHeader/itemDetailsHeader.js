import React, { useState } from "react";
import dayjs from "dayjs";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import ChangingProgressProvider from "./ChangingProgressProvider";
import ModalVideo from "react-modal-video";
import Slider from "react-slick";
import { getCountryName } from "./getCountryName";
import CardItem from "../cardItem/cardItem";
// import ReactTooltip from "react-tooltip";

import Fade from "react-reveal/Fade";

import "../../../node_modules/react-modal-video/scss/modal-video.scss";
import "react-circular-progressbar/dist/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./itemDetailsHeader.scss";

const ItemDetailsHeader = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [trailerID, setTrailerID] = useState(false);
  const [site, setSite] = useState("");

  const settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 15000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 790,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
        }
      }
    ]
  };

  const config = props.MDBConfig.images;
  const backgroundImgLink = config
    ? config.secure_base_url +
      config.backdrop_sizes[2] +
      props.details.backdrop_path
    : "";
  // const headerImg = {
  //   background: `linear-gradient(0deg, rgba(0,0,0,1) 5%, rgba(0,0,0,0.45) 92%) center center no-repeat, #fff url(${backgroundImgLink})center top no-repeat`
  // };
  const headerImg = {
    background: `linear-gradient(0deg, rgba(15,15,15,0.9) 5%, rgba(15,15,15,0.9) 92%) center center no-repeat, #fff url(${backgroundImgLink})center top no-repeat`
  };

  const posterLink = config
    ? config.secure_base_url +
        config.poster_sizes[3] +
        props.details.poster_path || props.details.backdrop_path
    : "";
  const castLink = memberPath => {
    return config
      ? config.secure_base_url + config.poster_sizes[1] + memberPath
      : "";
  };

  const pathTrailColor = rating => {
    return rating >= 7
      ? `rgba(19, 197, 37, ${(rating * 10) / 100})`
      : `rgba(255, 230, 0, ${(rating * 10) / 100})`;
  };
  const trailColor = rating => {
    return rating >= 7
      ? `rgba(6, 59, 11, ${(rating * 10) / 100})`
      : `rgba(124, 113, 12, ${(rating * 10) / 100})`;
  };

  const circularRatingBar = (
    <ChangingProgressProvider values={[0, props.details.vote_average * 10]}>
      {percentage => (
        <CircularProgressbar
          className="circularprogressbar"
          styles={buildStyles({
            textSize: "25px",
            pathTransitionDuration: 2.5,
            pathColor: `${pathTrailColor(props.details.vote_average)}`,
            textColor: "#fff",
            trailColor: `${trailColor(props.details.vote_average)}`,
            backgroundColor: "black"
          })}
          strokeWidth={10}
          background
          backgroundPadding={6}
          value={percentage}
          text={<tspan dy={2}>{props.details.vote_average * 10}%</tspan>}
        />
      )}
    </ChangingProgressProvider>
  );

  const runTime =
    props.details.runtime ||
    (props.details.episode_run_time ? props.details.episode_run_time[0] : "") ||
    "";
  const language = props.details.original_language;

  const imageSource = item => {
    return config
      ? config.secure_base_url + config.poster_sizes[0] + item.poster_path ||
          item.backdrop_path
      : "";
  };

  return (
    <div className="itemdetail-mainheader">
      <Fade>
        <header className="itemdetail-header" style={headerImg}>
          <div className="itemdetail-header-backimage">
            <div className="itemdetail-header-info">
              <section className="itemdetail-header-grid">
                <div className="itemdetail-header-poster">
                  <img className="poster fade-in one" src={posterLink} alt="" />
                </div>
                <div className="itemdetail-header-text">
                  <div className="itemdetail-title">
                    <h2>{props.details.name || props.details.title}</h2>
                    <h4>
                      (
                      {dayjs(
                        props.details.release_date ||
                          props.details.first_air_date
                      ).format("YYYY")}
                      )
                    </h4>
                  </div>
                  <div className="itemdetail-trailer-link">
                    <div className="rating-element">
                      <div className="circular-rating">{circularRatingBar}</div>
                      <div>
                        <span>
                          User
                          <br />
                          Score
                        </span>
                      </div>
                    </div>
                    <div>
                      <div>
                        {props.trailer.results[0] ? (
                          <div>
                            <div>
                              <ModalVideo
                                channel={site.toLowerCase()}
                                isOpen={isOpen}
                                videoId={trailerID}
                                onClose={() => setIsOpen(false)}
                              />
                            </div>
                            <div
                              className="details-trailer"
                              onClick={() => {
                                setIsOpen(true);
                                setTrailerID(props.trailer.results[0].key);
                                setSite(props.trailer.results[0].site);
                              }}
                            >
                              <span>
                                <i className="fa fa-play fa-sm" />
                                <span> Play Trailer</span>
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span style={{ opacity: "0.7" }}>
                            No Trailer available
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="itemdetail-header-overview">
                    <h4>Overview</h4>
                    <p>{props.details.overview}</p>
                  </div>
                  {props.credits.crew.length > 0 && (
                    <div className="itemdetail-header-crew">
                      <h4>Featured Crew</h4>
                      <div className="itemdetail-header-crew-members">
                        {props.credits.crew.map(
                          (member, i) =>
                            i < 3 && (
                              <div key={i}>
                                <h6>{member.name}</h6>
                                <p>{member.job}</p>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </header>
        <div>
          <main>
            <div className="itemdetail-main-grid">
              <section className="section-one">
                <div>
                  <div className="itemdetail-cast">
                    {props.credits.cast.length > 0 && (
                      <div>
                        <h4 style={{ letterSpacing: "1.5px" }}>
                          Top Billed Cast
                        </h4>
                        <div className="itemdetail-cast-members">
                          {props.credits.cast.map(
                            (member, i) =>
                              i < 5 && (
                                <div className="cast-card" key={i}>
                                  <div>
                                    <img
                                      className="cast-profile"
                                      src={castLink(member.profile_path)}
                                      alt=""
                                    />
                                  </div>
                                  <div className="cast-text">
                                    <h6>{member.name}</h6>
                                    <p>{member.character}</p>
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {props.reviews.results.length > 0 && (
                    <div className="itemdetail-reviews">
                      <hr />
                      <div className="review-title">
                        <h4 style={{ display: "flex" }}>
                          Reviews{" "}
                          {props.reviews.results.length > 2
                            ? "2"
                            : props.reviews.results.length}
                        </h4>
                        <div className="itemdetail-reviews-items">
                          {props.reviews.results.map(
                            (item, i) =>
                              i < 2 && (
                                <div className="review-card" key={i}>
                                  <div className="review-text">
                                    <p>
                                      "
                                      {item.content.length > 1000
                                        ? `${item.content.substring(
                                            0,
                                            1000
                                          )}...`
                                        : item.content}
                                      "
                                    </p>
                                    <span>- {item.author}</span>
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {props.recommendations.results.length > 0 && (
                    <div className="itemdetail-carousel">
                      <hr />
                      <h4 className="carousel-title">
                        Recommendations {props.recommendations.results.length}
                      </h4>
                      <Slider {...settings} style={{ textAlign: "center" }}>
                        {props.recommendations.results.map((item, i) => (
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
                  )}
                </div>
              </section>
              <section className="section-two">
                <div className="itemdetail-social-icons">
                  {props.social.twitter_id && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.twitter.com/${props.social.twitter_id}`}
                    >
                      <i className="fab fa-twitter-square" />
                    </a>
                  )}
                  {props.social.facebook_id && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.facebook.com/${props.social.facebook_id}`}
                    >
                      <i className="fab fa-facebook-square" />
                    </a>
                  )}
                  {props.social.instagram_id && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.facebook.com/${props.social.instagram_id}`}
                    >
                      <i className="fab fa-instagram" />
                    </a>
                  )}
                  {props.details.homepage && (
                    <span>
                      <p>
                        <span style={{ opacity: "0.3" }}> |</span>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`${props.details.homepage}`}
                        >
                          <i className="fas fa-link fa-sm" />
                        </a>
                      </p>
                    </span>
                  )}
                </div>
                <div className="itemdetail-facts">
                  <h5>Facts</h5>
                  <div className="itemdetail-status">
                    <h6>Status</h6>
                    <p>{props.details.status}</p>
                  </div>
                  <div className="itemdetail-release-date">
                    <h6>Release Date</h6>
                    <p>
                      {dayjs(
                        props.details.release_date ||
                          props.details.first_air_date
                      ).format("MMMM D, YYYY")}
                    </p>
                  </div>
                  <div className="itemdetail-language">
                    <h6>Original Language</h6>
                    <p>{getCountryName(language)}</p>
                  </div>
                  {runTime && (
                    <div className="itemdetail-runtime">
                      <h6>Runtime</h6>
                      <div className="itemdetail-runtime-data">
                        <p>
                          {Math.floor(runTime / 60)
                            ? `${Math.floor(runTime / 60)}h`
                            : ""}
                        </p>
                        <p>{runTime % 60 ? `${runTime % 60}m` : ""}</p>
                      </div>
                    </div>
                  )}
                  {props.details.budget > 100 && (
                    <div className="itemdetail-budget">
                      <h6>Budget</h6>
                      <p>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD"
                        }).format(props.details.budget)}
                      </p>
                    </div>
                  )}
                  {props.details.revenue > 100 && (
                    <div className="itemdetail-revenue">
                      <h6>Revenue</h6>
                      <p>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD"
                        }).format(props.details.revenue)}
                      </p>
                    </div>
                  )}
                  {props.details.genres && (
                    <div className="itemdetail-genres">
                      <h6>Genres</h6>
                      <div>
                        {props.details.genres &&
                          props.details.genres.map(genre => (
                            <p key={genre.id}>{genre.name}</p>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </main>
        </div>
      </Fade>
    </div>
  );
};

export default ItemDetailsHeader;
