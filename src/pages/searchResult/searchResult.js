import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import dayjs from "dayjs";

import Fade from "react-reveal/Fade";

import searchData from "../../actions/searchData";

import NavBar from "../../components/navBar/navBar";

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "./searchResult.scss";

const SearchResult = props => {
  const apiKey = props.apiKey;
  const params = props.match.params.id;

  const getSearchData = searchInput => {
    props.searchData(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchInput}&page=1&include_adult=false`
    );
  };

  useEffect(() => {
    getSearchData(params);
  }, [apiKey, params]);

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
    <div>
      <NavBar />
      <div className="searchresult-main">
        <Fade>
          <header className="searchresult-header">
            <h1>Search results for "{params}"</h1>
          </header>
          <div className="searchresult-body">
            <hr />
            <div className="card-wrapper">
              {props.searchDataResults.results != 0 ? (
                props.searchDataResults.results.map(
                  item =>
                    imageSource(item) &&
                    item.media_type === ("movie" || "tv") && (
                      <Link
                        to={`/details/${item.media_type.toLowerCase()}/${
                          item.id
                        }`}
                        key={item.id}
                        id="card-container"
                        className="card"
                      >
                        <div id="card-grid">
                          <div className="card">
                            <img
                              src={imageSource(item)}
                              className="card-img"
                              alt="..."
                            />
                          </div>
                          <div className="card">
                            <div className="card-body">
                              <div className="card-title">
                                <div>
                                  <CircularProgressbar
                                    className="circularprogressbar"
                                    styles={buildStyles({
                                      textSize: "45px",
                                      pathColor: `${pathTrailColor(
                                        item.vote_average
                                      )}`,
                                      textColor: "#fff",
                                      trailColor: "black",
                                      backgroundColor: "black"
                                    })}
                                    strokeWidth={10}
                                    background
                                    backgroundPadding={6}
                                    value={item.vote_average * 10}
                                    text={
                                      <tspan dy={2.5}>
                                        {item.vote_average * 10}
                                      </tspan>
                                    }
                                  />
                                </div>
                                <div>{item.title || item.name}</div>
                              </div>
                              <p
                                className="card-text"
                                style={
                                  ({ minHeight: "85px" }, { maxHeight: "85px" })
                                }
                              >
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
                              }
                            >
                              <div className="card-footer">
                                <small className="text-muted">
                                  {dayjs(
                                    item.release_date || item.first_air_date
                                  ).format("MMMM D, YYYY")}
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                )
              ) : (
                <h2 style={{ color: "white" }}>No results found</h2>
              )}
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  apiKey: state.PostMDBConfig.apiKey,
  MDBConfig: state.PostMDBConfig,

  searchDataResults: state.searchData
});

const mapDispatchToProps = dispatch => ({
  searchData: url => dispatch(searchData(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
