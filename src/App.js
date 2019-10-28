import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import { postMDBConfig } from "./actions/PostMDBConfigAction";
import postMovieGenres from "./actions/movieActions/postMovieGenres";
import postTVGenres from "./actions/TVActions/postTVGenres";

import ScrollToTop from "./components/scrollToTop/scrollToTop";
import NavBar from "./components/navBar/navBar";
import LandingPage from "./pages/landingPage/landingPage";
import Discover from "./pages/discover/discover";
import ItemDetails from "./pages/itemDetails/itemDetails";
import Footer from "./components/footer/footer";

import "./fontawesome/css/all.css";
import "./App.scss";

const App = props => {
  useEffect(() => {
    props.postMDBConfig(
      `https://api.themoviedb.org/3/configuration?api_key=${props.apiKey}`
    );
    props.postMovieGenres(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${props.apiKey}`
    );
    props.postTVGenres(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${props.apiKey}`
    );
  });

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <NavBar />
        <Route path="/" exact component={LandingPage} />
        <Route path="/discover" component={Discover} />
        <Route path="/details/:type/:id" component={ItemDetails} />
        <Footer />
      </div>
    </BrowserRouter>
  );
};
const mapStateToProps = state => ({
  apiKey: state.PostMDBConfig.apiKey,
  logInStatus: state.toggleLogInStatus.status,
  session: state.getSession
});

const mapDispatcherToProps = dispatch => ({
  postMDBConfig: url => dispatch(postMDBConfig(url)),
  postMovieGenres: url => dispatch(postMovieGenres(url)),
  postTVGenres: url => dispatch(postTVGenres(url))
});

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(App);
