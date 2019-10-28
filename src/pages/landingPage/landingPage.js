import React, { useEffect } from "react";

import { connect } from "react-redux";

import setItemType from "../../actions/setItemType";

import postMoviesNowPlaying from "../../actions/movieActions/postMoviesNowPlaying";
import postMoviesPopular from "../../actions/movieActions/postMoviesPopular";
import postMoviesTopRated from "../../actions/movieActions/postMoviesTopRated";
import postMoviesUpcoming from "../../actions/movieActions/postMoviesUpcoming";

import postTVAiringToday from "../../actions/TVActions/postTVAiringToday";
import postTVPopular from "../../actions/TVActions/postTVPopular";
import postTVOnTheAir from "../../actions/TVActions/postTVOnTheAir";
import postTVTopRated from "../../actions/TVActions/postTVTopRated";

import NavBar from "../../components/navBar/navBar";
import LandingHeader from "../../components/landingHeader/landingHeader";
import Carousel from "../../components/carousel/carousel";

import "./landingPage.scss";

const LandingPage = props => {
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

  const handleTVFetch = () => {
    props.postTVAiringToday(
      `https://api.themoviedb.org/3/tv/airing_today?api_key=${props.apiKey}&language=en-US&page=1`
    );
    props.postTVPopular(
      `https://api.themoviedb.org/3/tv/popular?api_key=${props.apiKey}&language=en-US&page=1`
    );
    props.postTVOnTheAir(
      `https://api.themoviedb.org/3/tv/on_the_air?api_key=${props.apiKey}&language=en-US&page=1`
    );
    props.postTVTopRated(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${props.apiKey}&language=en-US&page=1`
    );
  };
  useEffect(() => {
    if (props.itemType === "MOVIE") {
      handleMovieFetch();
    } else if (props.itemType === "TV") {
      handleTVFetch();
    }
  }, [props.itemType]);

  let movie;
  if (props.itemType === "MOVIE") {
    movie = (
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
  } else if (props.itemType === "TV") {
    movie = (
      <div>
        <Carousel
          title="Airing Today"
          genres={props.TVGenres.genres}
          MDBConfig={props.MDBConfig}
          items={props.TVAiringToday.results}
          type={props.itemType}
        />
        <Carousel
          title="Popular"
          genres={props.TVGenres.genres}
          MDBConfig={props.MDBConfig}
          items={props.TVPopular.results}
          type={props.itemType}
        />
        <Carousel
          title="On The Air"
          genres={props.TVGenres.genres}
          MDBConfig={props.MDBConfig}
          items={props.TVOnTheAir.results}
          type={props.itemType}
        />
        <Carousel
          title="Top Rated"
          genres={props.TVGenres.genres}
          MDBConfig={props.MDBConfig}
          items={props.TVTopRated.results}
          type={props.itemType}
        />
      </div>
    );
  }

  return (
    <div className="landing-page">
      <NavBar />
      <LandingHeader
        itemType={props.itemType}
        MDBConfig={props.MDBConfig}
        movieGenres={
          props.itemType === "TV" ? props.TVGenres : props.movieGenres
        }
        items={
          props.itemType === "TV"
            ? props.TVAiringToday.results
            : props.moviesNowPlaying.results
        }
      />
      <div className="landing-page-main">{movie}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  apiKey: state.PostMDBConfig.apiKey,
  MDBConfig: state.PostMDBConfig,

  movieGenres: state.postMovieGenres,
  TVGenres: state.postTVGenres,

  itemType: state.setItemType.itemType,

  moviesUpcoming: state.postMoviesUpcoming,
  moviesPopular: state.postMoviesPopular,
  moviesNowPlaying: state.postMoviesNowPlaying,
  moviesTopRated: state.postMoviesTopRated,

  TVAiringToday: state.postTVAiringToday,
  TVPopular: state.postTVPopular,
  TVOnTheAir: state.postTVOnTheAir,
  TVTopRated: state.postTVTopRated
});

const mapDispatchToProps = dispatch => ({
  setItemType: type => dispatch(setItemType(type)),

  postMoviesUpcoming: url => dispatch(postMoviesUpcoming(url)),
  postMoviesPopular: url => dispatch(postMoviesPopular(url)),
  postMoviesNowPlaying: url => dispatch(postMoviesNowPlaying(url)),
  postMoviesTopRated: url => dispatch(postMoviesTopRated(url)),

  postTVAiringToday: url => dispatch(postTVAiringToday(url)),
  postTVPopular: url => dispatch(postTVPopular(url)),
  postTVOnTheAir: url => dispatch(postTVOnTheAir(url)),
  postTVTopRated: url => dispatch(postTVTopRated(url))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
