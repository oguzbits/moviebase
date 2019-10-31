import React from "react";
import moment from "moment";
import {
  buildStyles,
  CircularProgressbarWithChildren,
  CircularProgressbar
} from "react-circular-progressbar";
import ChangingProgressProvider from "./ChangingProgressProvider";

import "react-circular-progressbar/dist/styles.css";
import "./itemDetailsHeader.scss";

const ItemDetailsHeader = props => {
  const handleGetGenre = genreId => {
    let mainGenre;
    if (props.movieGenres.genres) {
      props.movieGenres.genres.forEach(genre => {
        if (genre.id === genreId[0].id) {
          mainGenre = genre.name;
        }
      });
      return mainGenre;
    }
  };

  const config = props.MDBConfig.images;
  const backgroundImgLink = config
    ? config.secure_base_url +
      config.backdrop_sizes[2] +
      props.details.backdrop_path
    : "";
  const headerImg = {
    background: `linear-gradient(0deg, rgba(0,0,0,1) 5%, rgba(0,0,0,0.45) 92%) center center no-repeat, #fff url(${backgroundImgLink})center top no-repeat`
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
  return (
    <header className="itemdetail-header" style={headerImg}>
      <div className="itemdetail-header-backimage">
        <div className="itemdetail-header-info">
          <div className="itemdetail-title-grid">
            <img src={posterLink} />
            <div className="itemdetail-header-text">
              <div className="itemdetail-title">
                <h2>{props.details.name || props.details.title}</h2>
                <h4>({moment(props.details.release_date).format("YYYY")})</h4>
              </div>
              <div className="itemdetail-header-rating">
                <ChangingProgressProvider
                  values={[0, props.details.vote_average * 10]}>
                  {percentage => (
                    <CircularProgressbar
                      className="circularprogressbar"
                      styles={buildStyles({
                        textSize: "25px",
                        pathTransitionDuration: 2,
                        pathColor: `${pathTrailColor(
                          props.details.vote_average
                        )}`,
                        textColor: "#fff",
                        trailColor: `${trailColor(props.details.vote_average)}`,
                        backgroundColor: "black"
                      })}
                      strokeWidth={10}
                      background
                      backgroundPadding={6}
                      value={percentage}
                      // text={`${props.details.vote_average * 10}`}
                      text={
                        <tspan dy={2}>{props.details.vote_average * 10}%</tspan>
                      }
                    />
                  )}
                </ChangingProgressProvider>
                <h4>play trailer</h4>
              </div>
              <div className="itemdetail-header-overview">
                <h4>Overview</h4>
                <p>{props.details.overview}</p>
              </div>
            </div>
            {/* <p>
              {handleGetGenre(props.details.genres)} |{" "}
              {props.details.vote_average}
              <i className="fas fa-star" />
            </p> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ItemDetailsHeader;
