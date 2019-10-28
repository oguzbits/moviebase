import React, { useEffect } from "react";

import { connect } from "react-redux";

import setItemType from "../../actions/setItemType";

import postMoviesNowPlaying from "../../actions/movieActions/postMoviesNowPlaying";
import postMoviesPopular from "../../actions/movieActions/postMoviesPopular";
import postMoviesTopRated from "../../actions/movieActions/postMoviesTopRated";
import postMoviesUpcoming from "../../actions/movieActions/postMoviesUpcoming";

import MovieHeader from "../../components/movieHeader/movieHeader";
import Carousel from "../../components/carousel/carousel";

import "./moviePage.scss";

const MoviePage = props => {
  useEffect(() => {
    const handleMovieFetch = () => {
      props.postMoviesUpcoming(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${props.apiKey}&language=en-US&page=1`
      );
      props.postMoviesPopular(
        `https://api.themoviedb.org/3/movie/popular?api_key=${props.apiKey}&language=en-US&page=1`
      );
      props.postMoviesNowPlaying(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${props.apiKey}&language=en-US&page=1`
      );
      props.postMoviesTopRated(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${props.apiKey}&language=en-US&page=1`
      );
    };
    handleMovieFetch();
    console.log("useEfect triggered");
  }, []);

  let movie = (
    <div>
      <Carousel
        title="Upcoming"
        genres={props.movieGenres.genres}
        MDBConfig={props.MDBConfig}
        items={props.moviesUpcoming.results}
        type={props.itemType}
      />
      <Carousel
        title="Popular"
        genres={props.movieGenres.genres}
        MDBConfig={props.MDBConfig}
        items={props.moviesPopular.results}
        type={props.itemType}
      />
      <Carousel
        title="Now Playing"
        genres={props.movieGenres.genres}
        MDBConfig={props.MDBConfig}
        items={props.moviesNowPlaying.results}
        type={props.itemType}
      />
      <Carousel
        title="Top Rated"
        genres={props.movieGenres.genres}
        MDBConfig={props.MDBConfig}
        items={props.moviesTopRated.results}
        type={props.itemType}
      />
    </div>
  );

  return (
    <div className="movie-page">
      <MovieHeader
        itemType={props.itemType}
        MDBConfig={props.MDBConfig}
        movieGenres={props.movieGenres}
        items={props.moviesNowPlaying.results}
      />
      <div className="movie-page-main">{movie}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  apiKey: state.PostMDBConfig.apiKey,
  MDBConfig: state.PostMDBConfig,

  movieGenres: state.postMovieGenres.genres,

  itemType: state.setItemType.itemType,

  moviesUpcoming: state.postMoviesUpcoming,
  moviesPopular: state.postMoviesPopular,
  moviesNowPlaying: state.postMoviesNowPlaying,
  moviesTopRated: state.postMoviesTopRated
});

const mapDispatchToProps = dispatch => ({
  setItemType: type => dispatch(setItemType(type)),

  postMoviesUpcoming: url => dispatch(postMoviesUpcoming(url)),
  postMoviesPopular: url => dispatch(postMoviesPopular(url)),
  postMoviesNowPlaying: url => dispatch(postMoviesNowPlaying(url)),
  postMoviesTopRated: url => dispatch(postMoviesTopRated(url))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviePage);
