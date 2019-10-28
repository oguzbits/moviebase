import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import MovieDetailsHeader from "../../components/movieDetailsHeader/movieDetailsHeader";

import getMovieDetails from "../../actions/movieActions/getMovieDetails";
import getMovieCredits from "../../actions/movieActions/getMovieCredits";
import getMovieTrailers from "../../actions/movieActions/getMovieTrailers";
import getMovieReviews from "../../actions/movieActions/getMovieReviews";

import "./movieDetails.scss";

const MovieDetails = props => {
  useEffect(() => {
    fetchData(props.match.params.id);
  }, []);

  const fetchData = id => {
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
  };

  return (
    <div className="tvdetails-main">
      <MovieDetailsHeader
        details={props.movieDetails}
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
  movieReviews: state.getMovieReviews
});

const mapDispatchToProps = dispatch => ({
  getMovieDetails: url => dispatch(getMovieDetails(url)),
  getMovieCredits: url => dispatch(getMovieCredits(url)),
  getMovieTrailers: url => dispatch(getMovieTrailers(url)),
  getMovieReviews: url => dispatch(getMovieReviews(url))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetails);
