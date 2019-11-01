import React, { useState } from "react";
import moment from "moment";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import ChangingProgressProvider from "./ChangingProgressProvider";
import ModalVideo from "react-modal-video";

import "../../../node_modules/react-modal-video/scss/modal-video.scss";
import "react-circular-progressbar/dist/styles.css";
import "./itemDetailsHeader.scss";

const ItemDetailsHeader = props => {
  const [isOpen, setIsOpen] = useState(false);

  // const handleGetGenre = genreId => {
  //   let mainGenre;
  //   if (props.movieGenres.genres) {
  //     props.movieGenres.genres.forEach(genre => {
  //       if (genre.id === genreId[0].id) {
  //         mainGenre = genre.name;
  //       }
  //     });
  //     return mainGenre;
  //   }
  // };

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
    background: `linear-gradient(0deg, rgba(27,27,27,0.7) 5%, rgba(27,27,27,0.7) 92%) center center no-repeat, #fff url(${backgroundImgLink})center top no-repeat`
  };

  const posterLink = config
    ? config.secure_base_url +
        config.poster_sizes[3] +
        props.details.poster_path || props.details.backdrop_path
    : "";

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

  {
    /* <p>
              {handleGetGenre(props.details.genres)} |{" "}
              {props.details.vote_average}
              <i className="fas fa-star" />
            </p> */
  }

  return (
    <div>
      <header className="itemdetail-header" style={headerImg}>
        <div className="itemdetail-header-backimage">
          <div className="itemdetail-header-info">
            <section className="itemdetail-title-grid">
              <div className="itemdetail-header-poster">
                <img className="visible" src={posterLink} alt="" />
              </div>
              <div className="itemdetail-header-text">
                <div className="itemdetail-title">
                  <h2>{props.details.name || props.details.title}</h2>
                  <h4>({moment(props.details.release_date).format("YYYY")})</h4>
                </div>
                <div className="itemdetail-trailer-link">
                  <div className="circular-rating">{circularRatingBar}</div>
                  <h4>
                    User
                    <br />
                    Score
                  </h4>
                  <div>
                    <ModalVideo
                      channel="youtube"
                      isOpen={isOpen}
                      videoId="L61p2uyiMSo"
                      onClose={() => setIsOpen(false)}
                    />
                    <li
                      className="details-trailer"
                      onClick={() => setIsOpen(true)}>
                      {/* <i className="material-icons">play_arrow</i> */}
                      Play Trailer
                    </li>
                  </div>
                </div>
                <div className="itemdetail-header-overview">
                  <h4>Overview</h4>
                  <p>{props.details.overview}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </header>
      <main className="itemdetail-header-main-info">
        <div className="itemdetail-header-rating"></div>
      </main>
    </div>
  );
};

export default ItemDetailsHeader;
