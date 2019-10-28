import React, { useEffect } from "react";

import { connect } from "react-redux";

import setItemType from "../../actions/setItemType";

import postTVAiringToday from "../../actions/TVActions/postTVAiringToday";
import postTVPopular from "../../actions/TVActions/postTVPopular";
import postTVOnTheAir from "../../actions/TVActions/postTVOnTheAir";
import postTVTopRated from "../../actions/TVActions/postTVTopRated";

// import MainFooter from '../MainFooter/MainFooter';

import TvHeader from "../../components/tvHeader/tvHeader";
import Carousel from "../../components/carousel/carousel";

import "./tvPage.scss";

const TvPage = props => {
  useEffect(() => {
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

    handleTVFetch();
  }, []);

  let TVShow = (
    <div>
      <Carousel
        title="Airing Today"
        genres={props.TVGenres}
        MDBConfig={props.MDBConfig}
        items={props.TVAiringToday.results}
        type={props.itemType}
      />
      <Carousel
        title="Popular"
        genres={props.TVGenres}
        MDBConfig={props.MDBConfig}
        items={props.TVPopular.results}
        type={props.itemType}
      />
      <Carousel
        title="On The Air"
        genres={props.TVGenres}
        MDBConfig={props.MDBConfig}
        items={props.TVOnTheAir.results}
        type={props.itemType}
      />
      <Carousel
        title="Top Rated"
        genres={props.TVGenres}
        MDBConfig={props.MDBConfig}
        items={props.TVTopRated.results}
        type={props.itemType}
      />
    </div>
  );

  return (
    <div className="tv-page">
      <TvHeader
        itemType={props.itemType}
        MDBConfig={props.MDBConfig}
        TVGenres={props.TVGenres}
        items={props.TVAiringToday.results}
      />
      <div className="tv-page-main">{TVShow}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  apiKey: state.PostMDBConfig.apiKey,
  MDBConfig: state.PostMDBConfig,

  TVGenres: state.postTVGenres.genres,

  itemType: state.setItemType.itemType,

  TVAiringToday: state.postTVAiringToday,
  TVPopular: state.postTVPopular,
  TVOnTheAir: state.postTVOnTheAir,
  TVTopRated: state.postTVTopRated
});

const mapDispatchToProps = dispatch => ({
  setItemType: type => dispatch(setItemType(type)),

  postTVAiringToday: url => dispatch(postTVAiringToday(url)),
  postTVPopular: url => dispatch(postTVPopular(url)),
  postTVOnTheAir: url => dispatch(postTVOnTheAir(url)),
  postTVTopRated: url => dispatch(postTVTopRated(url))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TvPage);
