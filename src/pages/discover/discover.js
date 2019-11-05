import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import CardItem from "../../components/cardItem/cardItem";

import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";

import setItemType from "../../actions/setItemType";
import getDiscover from "../../actions/getDiscover";

import { options } from "../../components/discoverForms/popularity";
import keyword_ids from "../../components/discoverForms/keyword_ids.json";

import { Dropdown } from "semantic-ui-react";
import Pagination from "../../components/pagination";

import "react-circular-progressbar/dist/styles.css";
import "./discover.scss";

const Discover = props => {
  const currentYear = new Date().getFullYear();

  const [sortBy, setSortBy] = useState("popularity.desc");
  const [genres, setGenres] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState([]);
  const [year, setYear] = useState(currentYear);
  const [page, setPage] = useState(1);

  useEffect(() => {
    handleGetDiscover();
  }, [props.apiKey, props.itemType, sortBy, genres, keywords, year, page]);

  const handleGetDiscover = () => {
    props.getDiscover(
      `https://api.themoviedb.org/3/discover/${props.itemType.toLowerCase()}?api_key=${
        props.apiKey
      }&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false
     &page=${page}&with_genres=${genres.value ? genres.value : []}${
        keywords.value ? `&with_keywords=${keywords.value}` : ""
      }${
        props.itemType === "TV"
          ? "&first_air_date_year="
          : "&primary_release_year="
      }${year}`
    );
  };

  const handleGenreList = () => {
    let genreType =
      props.itemType === "MOVIE" ? props.movieGenres : props.TVGenres;
    let List = genreType.map(genre => ({
      key: genre.id,
      text: genre.name,
      value: genre.id
    }));
    return List;
  };

  const handleKeywordList = searchInput => {
    if (searchInput.length > 1) {
      const filtered = keyword_ids.filter(
        // el => el.name.toLowerCase().indexOf(searchInput.toLowerCase()) > -1
        el => el.name.toLowerCase().startsWith(searchInput.toLowerCase())
      );
      const options = filtered
        .map(
          (keyword, i) =>
            i < 20 && {
              key: keyword.id,
              text: keyword.name,
              value: keyword.id
            }
        )
        .sort((a, b) => a.text - b.text);
      return setKeywordInput(options);
    }
  };

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
  const handleYearList = yearList => {
    return yearList.reverse().map(year => ({ text: year, value: year }));
  };

  const pathTrailColor = rating => {
    return rating >= 7
      ? `rgba(16, 138, 26, ${(rating * 10) / 100})`
      : `rgba(255, 194, 25, ${(rating * 10) / 100})`;
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
      <div className="discover-main">
        <header>
          <h1>DISCOVER</h1>
          <hr />
          <div className="discover-subheader">
            <h3
              id="header-movies"
              style={{
                textDecoration: props.itemType === "TV" ? "" : "underline"
              }}
              onClick={() => {
                props.setItemType("MOVIE");
                setPage(1);
              }}>
              Movies
            </h3>
            <h3
              id="header-tvshows"
              style={{
                textDecoration: props.itemType === "TV" ? "underline" : ""
              }}
              onClick={() => {
                props.setItemType("TV");
                setPage(1);
              }}>
              TV Shows
            </h3>
          </div>
          <form className="discover-header-form">
            <div className="discover-header-form-container">
              <div className="select-year">
                <h6>Year</h6>
                <Dropdown
                  defaultValue={currentYear}
                  fluid
                  selection
                  onChange={(...args) => {
                    setYear(args[1].value);
                  }}
                  options={handleYearList(yearList)}
                />
              </div>
              <div className="select-sortby">
                <h6>Sort By</h6>
                <Dropdown
                  defaultValue={options[0].value}
                  fluid
                  selection
                  onChange={(...args) => {
                    setSortBy(args[1].value);
                  }}
                  options={options}
                />
              </div>
              <div className="select-genres">
                <h6>Genres</h6>
                <Dropdown
                  placeholder="Filter by genres..."
                  fluid
                  multiple
                  search
                  selection
                  onChange={(...args) => {
                    setGenres({ value: args[1].value });
                  }}
                  clearable
                  options={handleGenreList()}
                />
              </div>
              <div className="select-keywords">
                <h6>Keywords</h6>
                <Dropdown
                  placeholder="Filter by keywords..."
                  fluid
                  multiple
                  search
                  selection
                  onSearchChange={(...args) => {
                    handleKeywordList(args[1].searchQuery);
                  }}
                  onChange={(...args) => {
                    setKeywords({ value: args[1].value });
                  }}
                  clearable
                  options={keywordInput}
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
                    <div>
                      <CardItem
                        item={item}
                        type={props.itemType}
                        pathcolor={pathTrailColor(item.vote_average)}
                        image={imageSource(item)}
                      />
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
      <Footer />
    </div>
  );
};

const mapStateToProps = state => ({
  apiKey: state.PostMDBConfig.apiKey,
  MDBConfig: state.PostMDBConfig,

  itemType: state.setItemType.itemType,

  movieGenres: state.postMovieGenres.genres,
  TVGenres: state.postTVGenres.genres,
  discover: state.getDiscover
});

const mapDispatchToProps = dispatch => ({
  setItemType: type => dispatch(setItemType(type)),

  getDiscover: url => dispatch(getDiscover(url))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Discover);
