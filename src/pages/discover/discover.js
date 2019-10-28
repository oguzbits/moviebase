import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import moment from "moment";

import getDiscover from "../../actions/getDiscover";

import Popularity from "../../components/discoverForms/popularity";
import GenreList from "../../components/discoverForms/genreList";

import Pagination from "../../components/pagination";
import "./discover.scss";

const Discover = props => {
  const currentYear = new Date().getFullYear();

  const [type, setType] = useState("movie");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [genres, setGenres] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [year, setYear] = useState(currentYear);
  const [page, setPage] = useState(1);

  const handleGetDiscover = () => {
    props.getDiscover(
      `https://api.themoviedb.org/3/discover/${type}?api_key=${
        props.apiKey
      }&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false
     &page=${page}&with_genres=${genres}${
        keywords ? `&with_keywords=${keywords}` : ""
      }${
        type === "movie" ? "&primary_release_year=" : "&first_air_date_year="
      }${year}`
    );
  };

  // const handleGenreList = () => {
  //   let genreType = type === "movie" ? props.movieGenres : props.TVGenres;
  //   let List = genreType.map(genre => ({
  //     key: genre.id,
  //     name: genre.name,
  //     value: genre.id
  //   }));
  //   return List;
  // };

  useEffect(() => {
    handleGetDiscover();
  }, [props.apiKey, type, sortBy, genres, keywords, year, page]);

  const getDateArray = (start, end) => {
    let arr = [],
      dt = start;
    while (dt <= end) {
      arr.push(dt);
      dt++;
    }
    return arr;
  };

  const yearList = [...getDateArray(1900, currentYear), "None"];

  const config = props.MDBConfig;
  const imageSource = item => {
    return config.images
      ? config.images.secure_base_url +
          config.images.poster_sizes[0] +
          item.poster_path || item.backdrop_path
      : "";
  };
  return (
    <div className="discover-main">
      <header>
        <h1>DISCOVER</h1>
        <hr />
        <div className="discover-subheader">
          <h3
            id="header-movies"
            style={{
              textDecoration: type === "movie" ? "underline" : ""
            }}
            onClick={() => {
              setType("movie");
              setPage(1);
            }}>
            Movies
          </h3>
          <h3
            id="header-tvshows"
            style={{
              textDecoration: type === "tv" ? "underline" : ""
            }}
            onClick={() => {
              setType("tv");
              setPage(1);
            }}>
            TV Shows
          </h3>
        </div>
        <form className="discover-header-form">
          <div className="discover-header-form-container">
            <div className="select-year">
              <h6>Year</h6>
              <select
                className="custom-select my-1 mr-sm-2"
                onChange={e => setYear(e.target.value)}
                name="year"
                defaultValue={currentYear}>
                {Array.from(yearList)
                  .reverse()
                  .map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
              </select>
            </div>
            <div className="select-sortby">
              <h6>Sort By</h6>
              <select
                className="custom-select my-1 mr-sm-2"
                onChange={e => setSortBy(e.target.value)}
                name="sort_by">
                <Popularity />
              </select>
            </div>
            <div className="select-genres">
              <h6>Genres</h6>
              {/* <input
                multiple
                name="genreinput"
                className="custom-select my-1 mr-sm-2"
                list="genrelist"
                value={genres}
                onChange={e => setGenres(e.target.key)}
                placeholder="Filter by genres..."
              />
              <datalist id="genrelist">
                <GenreList
                  Genres={type === "movie" ? props.movieGenres : props.TVGenres}
                />
              </datalist> */}
              <select
                className="custom-select my-1 mr-sm-2"
                value={genres.id}
                onChange={e => setGenres(e.target.value)}
                placeholder="Filter by genres...">
                <GenreList
                  Genres={type === "movie" ? props.movieGenres : props.TVGenres}
                />
              </select>
            </div>
            <div className="select-keywords">
              <h6>Keywords</h6>
              <input
                multiple="multiple"
                className="form-control"
                onSubmit={e => {
                  e.preventDefault();
                  setKeywords(e.target.value);
                }}
                type="text"
                name="keywords"
                placeholder="Filter by keywords..."
              />
            </div>
          </div>
        </form>
      </header>
      <main className="discover-main">
        <div className="card-wrapper">
          {props.discover.results.length > 0 ? (
            props.discover.results.map(
              item =>
                imageSource(item) &&
                item.overview && (
                  <div key={item.id} id="card-container" className="card">
                    <div id="card-grid">
                      <div className="card">
                        <img
                          src={imageSource(item)}
                          alt="..."
                          className="card-img"
                        />
                      </div>
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">
                            {item.vote_average} | {item.title || item.name}
                          </h5>
                          <p
                            className="card-text"
                            style={
                              ({ minHeight: "85px" }, { maxHeight: "85px" })
                            }>
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
                              {moment(
                                item.release_date || item.first_air_date
                              ).format("MMMM D, YYYY")}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )
          ) : (
            <h2 style={{ color: "white" }} className="discover-warning">
              No results found
            </h2>
          )}
        </div>
      </main>
      <div className="discover-pagination">
        <Pagination
          itemsCount={200}
          pageSize={20}
          currentPage={page}
          onPageChange={page => setPage(page)}
        />
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  apiKey: state.PostMDBConfig.apiKey,
  MDBConfig: state.PostMDBConfig,

  movieGenres: state.postMovieGenres.genres,
  TVGenres: state.postTVGenres.genres,
  discover: state.getDiscover
});

const mapDispatchToProps = dispatch => ({
  getDiscover: url => dispatch(getDiscover(url))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Discover);
