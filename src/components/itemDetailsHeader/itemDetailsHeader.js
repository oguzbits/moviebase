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
  const [trailerID, setTrailerID] = useState(false);
  const [site, setSite] = useState("");

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
    background: `linear-gradient(0deg, rgba(15,15,15,0.95) 5%, rgba(15,15,15,0.95) 92%) center center no-repeat, #fff url(${backgroundImgLink})center top no-repeat`
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
                <h4>({moment(props.details.release_date).format("YYYY")})</h4>
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
                          }}>
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
                    {props.credits.crew.map((member, i) => {
                      if (i < 3) {
                        return (
                          <div key={member.i}>
                            <h6>{member.name}</h6>
                            <p>{member.job}</p>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </header>
  );
};

export default ItemDetailsHeader;
