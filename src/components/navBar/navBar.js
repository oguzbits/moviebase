import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import setItemType from "../../actions/setItemType";

import Movielogo from "../../images/Movielogo.svg";
import "./navBar.scss";

const NavBar = props => {
  const setDiscoverType = type => {
    props.setItemType(type);
    props.history.push("/discover");
  };
  const setMovieType = type => {
    props.setItemType(type);
    props.history.push("/");
  };
  const setTVType = type => {
    props.setItemType(type);
    props.history.push("/");
  };

  const [search, setSearch] = useState("");

  return (
    <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
      <li className="navbar-brand" onClick={() => setMovieType("MOVIE")}>
        <img src={Movielogo} width="30" height="30" alt="" />
      </li>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li
            className="nav-item active"
            onClick={() => setDiscoverType("MOVIE")}>
            Discover
          </li>
          <li className="nav-item active" onClick={() => setMovieType("MOVIE")}>
            Movies
            <span className="sr-only">(current)</span>
          </li>
          <li className="nav-item active" onClick={() => setTVType("TV")}>
            Tv Shows
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            onChange={e => {
              setSearch(e.target.value);
            }}
            placeholder="Search..."
          />
          <Link to={`/search-results/${search}`}>
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit">
              Search
            </button>
          </Link>
        </form>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  itemType: state.setItemType.itemType
});

const mapDispatchToProps = dispatch => ({
  setItemType: type => dispatch(setItemType(type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavBar));
