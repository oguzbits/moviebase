import React, { useEffect } from "react";
import { connect } from "react-redux";

import NavBar from "../../components/navBar/navBar";

import ItemDetailsHeader from "../../components/itemDetailsHeader/itemDetailsHeader";

import getMovieDetails from "../../actions/movieActions/getMovieDetails";
import getMovieCredits from "../../actions/movieActions/getMovieCredits";
import getMovieTrailers from "../../actions/movieActions/getMovieTrailers";
import getMovieReviews from "../../actions/movieActions/getMovieReviews";
import getMovieRecommendations from "../../actions/movieActions/getMovieRecommendations";
import getMovieExternalIDs from "../../actions/movieActions/getMovieExternalIDs";

import getTVDetails from "../../actions/TVActions/getTVDetails";
import getTVCredits from "../../actions/TVActions/getTVCredits";
import getTVTrailers from "../../actions/TVActions/getTVTrailers";
import getTVReviews from "../../actions/TVActions/getTVReviews";
import getTVRecommendations from "../../actions/TVActions/getTVRecommendations";
import getTVExternalIDs from "../../actions/TVActions/getTVExternalIDs";

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
      props.getMovieRecommendations(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${props.apiKey}&language=en-US`
      );
      props.getMovieExternalIDs(
        `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${props.apiKey}`
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
      props.getTVRecommendations(
        `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${props.apiKey}&language=en-US`
      );
      props.getTVExternalIDs(
        `https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${props.apiKey}`
      );
    }
  };

  return (
    <div className="itemdetails-main">
      <NavBar />
      <div className="itemdetails-grid">
        <ItemDetailsHeader
          className="itemdetails-header-main"
          movieGenres={
            props.itemType === "TV" ? props.TVGenres : props.movieGenres
          }
          details={
            props.match.params.type === "movie"
              ? props.movieDetails
              : props.TVDetails
          }
          trailer={
            props.match.params.type === "movie"
              ? props.movieTrailers
              : props.TVTrailers
          }
          credits={
            props.match.params.type === "movie"
              ? props.movieCredits
              : props.TVCredits
          }
          reviews={
            props.match.params.type === "movie"
              ? props.movieReviews
              : props.TVReviews
          }
          recommendations={
            props.match.params.type === "movie"
              ? props.movieRecommendations
              : props.TVRecommendations
          }
          social={
            props.match.params.type === "movie"
              ? props.movieExternalIDs
              : props.TVExternalIDs
          }
          MDBConfig={props.MDBConfig}
          type={props.itemType}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  apiKey: state.PostMDBConfig.apiKey,
  MDBConfig: state.PostMDBConfig,

  movieGenres: state.postMovieGenres,
  TVGenres: state.postTVGenres,

  itemType: state.setItemType.itemType,

  movieDetails: state.getMovieDetails,
  movieCredits: state.getMovieCredits,
  movieTrailers: state.getMovieTrailers,
  movieReviews: state.getMovieReviews,
  movieRecommendations: state.getMovieRecommendations,
  movieExternalIDs: state.getMovieExternalIDs,

  TVDetails: state.getTVDetails,
  TVCredits: state.getTVCredits,
  TVTrailers: state.getTVTrailers,
  TVReviews: state.getTVReviews,
  TVRecommendations: state.getTVRecommendations,
  TVExternalIDs: state.getTVExternalIDs
});

const mapDispatchToProps = dispatch => ({
  getMovieDetails: url => dispatch(getMovieDetails(url)),
  getMovieCredits: url => dispatch(getMovieCredits(url)),
  getMovieTrailers: url => dispatch(getMovieTrailers(url)),
  getMovieReviews: url => dispatch(getMovieReviews(url)),
  getMovieRecommendations: url => dispatch(getMovieRecommendations(url)),
  getMovieExternalIDs: url => dispatch(getMovieExternalIDs(url)),

  getTVDetails: url => dispatch(getTVDetails(url)),
  getTVCredits: url => dispatch(getTVCredits(url)),
  getTVTrailers: url => dispatch(getTVTrailers(url)),
  getTVReviews: url => dispatch(getTVReviews(url)),
  getTVRecommendations: url => dispatch(getTVRecommendations(url)),
  getTVExternalIDs: url => dispatch(getTVExternalIDs(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
