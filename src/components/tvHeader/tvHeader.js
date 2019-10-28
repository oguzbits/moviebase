import React from "react";
import { Link } from "react-router-dom";

import "./tvHeader.scss";

const TvHeader = props => {
  const handleGetGenre = genreId => {
    let mainGenre;
    if (props.tvGenres) {
      props.tvGenres.forEach(genre => {
        if (genre.id === genreId[0]) {
          mainGenre = genre.name;
          // console.log("logged");
        }
      });
      return mainGenre;
    }
  };

  const config = props.MDBConfig;

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide carousel-fade"
      data-ride="carousel">
      <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleCaptions"
          data-slide-to="0"
          className="active"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        {props.items.map((item, i) => {
          // if (i < 3) {
          if (i > 3 && i < 7) {
            return (
              <Link
                to={`/details/${props.itemType.toLowerCase()}/${item.id}`}
                key={item.id}
                className={i === 4 ? "carousel-item active" : "carousel-item"}>
                <img
                  src={
                    config.images
                      ? config.images.secure_base_url +
                        config.images.backdrop_sizes[2] +
                        item.backdrop_path
                      : ""
                  }
                  className="d-block w-100"
                  alt=""
                />
                <div className="carousel-caption">
                  <h2>{item.name}</h2>
                  <p>
                    {handleGetGenre(item.genre_ids)} | {item.vote_average}{" "}
                    <i className="fas fa-star" />
                  </p>
                </div>
              </Link>
            );
          }
          return 0;
        })}
      </div>
    </div>
  );
};

export default TvHeader;
