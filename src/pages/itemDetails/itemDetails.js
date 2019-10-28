import React, { useEffect } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

import ItemDetailsHeader from "../../components/itemDetailsHeader/itemDetailsHeader";

import getMovieDetails from "../../actions/movieActions/getMovieDetails";
import getMovieCredits from "../../actions/movieActions/getMovieCredits";
import getMovieTrailers from "../../actions/movieActions/getMovieTrailers";
import getMovieReviews from "../../actions/movieActions/getMovieReviews";

import getTVDetails from "../../actions/TVActions/getTVDetails";
import getTVCredits from "../../actions/TVActions/getTVCredits";
import getTVTrailers from "../../actions/TVActions/getTVTrailers";
import getTVReviews from "../../actions/TVActions/getTVReviews";

import "./itemDetails.scss";

const ItemDetails = props => {
  useEffect(() => {
    fetchData(props.match.params.id);
  }, [props.match.params.id]);

  const fetchData = (id, type = props.match.params.type) => {
    if (type === "movie") {
      props.getMovieDetails(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${props.apiKey}&language=en-US`
      );
      props.getMovieCredits(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${props.apiKey}&language=en-US`
      );
      props.getMovieTrailers(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${props.apiKey}&language=en-US`
      );
      props.getMovieReviews(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${props.apiKey}&language=en-US`
      );
    } else if (type === "tv") {
      props.getTVDetails(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${props.apiKey}&language=en-US`
      );
      props.getTVCredits(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${props.apiKey}&language=en-US`
      );
      props.getTVTrailers(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${props.apiKey}&language=en-US`
      );
      props.getTVReviews(
        `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${props.apiKey}&language=en-US`
      );
    }
  };

  return (
    <div className="tvdetails-main">
      <ItemDetailsHeader
        details={
          props.match.params.type === "movie"
            ? props.movieDetails
            : props.TVDetails
        }
        MDBConfig={props.MDBConfig}
        type={props.itemType}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  apiKey: state.PostMDBConfig.apiKey,
  MDBConfig: state.PostMDBConfig,

  itemType: state.setItemType.itemType,

  movieDetails: state.getMovieDetails,
  movieCredits: state.getMovieCredits,
  movieTrailers: state.getMovieTrailers,
  movieReviews: state.getMovieReviews,

  TVDetails: state.getTVDetails,
  TVCredits: state.getTVCredits,
  TVTrailers: state.getTVTrailers,
  TVReviews: state.getTVReviews
});

const mapDispatchToProps = dispatch => ({
  getMovieDetails: url => dispatch(getMovieDetails(url)),
  getMovieCredits: url => dispatch(getMovieCredits(url)),
  getMovieTrailers: url => dispatch(getMovieTrailers(url)),
  getMovieReviews: url => dispatch(getMovieReviews(url)),

  getTVDetails: url => dispatch(getTVDetails(url)),
  getTVCredits: url => dispatch(getTVCredits(url)),
  getTVTrailers: url => dispatch(getTVTrailers(url)),
  getTVReviews: url => dispatch(getTVReviews(url))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetails);
