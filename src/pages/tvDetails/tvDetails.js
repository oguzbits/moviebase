import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import MovieDetailsHeader from "../../components/movieDetailsHeader/movieDetailsHeader";

import getTVDetails from "../../actions/TVActions/getTVDetails";
import getTVCredits from "../../actions/TVActions/getTVCredits";
import getTVTrailers from "../../actions/TVActions/getTVTrailers";
import getTVReviews from "../../actions/TVActions/getTVReviews";

import "./tvDetails.scss";

const TVDetails = props => {
  useEffect(() => {
    fetchData(props.match.params.id);
  }, []);

  const fetchData = id => {
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
  };

  return (
    <div className="tvdetails-main">
      <MovieDetailsHeader
        details={props.TVDetails}
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

  TVDetails: state.getTVDetails,
  TVCredits: state.getTVCredits,
  TVTrailers: state.getTVTrailers,
  TVReviews: state.getTVReviews
});

const mapDispatchToProps = dispatch => ({
  getTVDetails: url => dispatch(getTVDetails(url)),
  getTVCredits: url => dispatch(getTVCredits(url)),
  getTVTrailers: url => dispatch(getTVTrailers(url)),
  getTVReviews: url => dispatch(getTVReviews(url))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TVDetails);
