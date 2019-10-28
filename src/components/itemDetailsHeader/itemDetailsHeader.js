import React from "react";
// import { Link } from "react-router-dom";

import "./itemDetailsHeader.scss";

const ItemDetailsHeader = props => {
  //   const handleGetGenre = genreId => {
  //     let mainGenre;
  //     if (props.movieGenres) {
  //       props.movieGenres.forEach(genre => {
  //         if (genre.id === genreId[0]) {
  //           mainGenre = genre.name;
  //         }
  //       });
  //       return mainGenre;
  //     }
  //   };

  const config = props.MDBConfig.images;

  return (
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img
          src={
            config
              ? config.secure_base_url +
                config.backdrop_sizes[2] +
                props.details.backdrop_path
              : ""
          }
          className="d-block w-100"
          alt=""
        />
        <div className="carousel-caption">
          <h2>{props.details.name || props.details.title}</h2>
          <p>
            {/* {handleGetGenre(item.genre_ids)} | {item.vote_average}{" "} */}
            <i className="fas fa-star" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsHeader;
