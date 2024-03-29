import { combineReducers } from "redux";
import PostMDBConfigReducer from "./PostMDBConfigReducer";

import getRequestToken from "./authenticationReducers/getRequestToken";
import getSession from "./authenticationReducers/getSession";
import deleteSession from "./authenticationReducers/deleteSession";
import getGuestSession from "./authenticationReducers/getGuestSession";
import toggleLogInStatus from "./authenticationReducers/toggleLogInStatus";
import getUserDetails from "./authenticationReducers/getUserDetails";

import postMovieGenres from "./movieReducers/postMovieGenres";
import postTVGenres from "./TVReducers/postTVGenres";

import setItemType from "./setItemType";
import searchData from "./searchData";
import postSearchResults from "./postSearchResults";

import postMoviesNowPlaying from "./movieReducers/postMoviesNowPlaying";
import postMoviesPopular from "./movieReducers/postMoviesPopular";
import postMoviesTopRated from "./movieReducers/postMoviesTopRated";
import postMoviesUpcoming from "./movieReducers/postMoviesUpcoming";
import getMovieDetails from "./movieReducers/getMovieDetails";
import getMovieRecommendations from "./movieReducers/getMovieRecommendations";
import getMovieCredits from "./movieReducers/getMovieCredits";
import getMovieExternalIDs from "./movieReducers/getMovieExternalIDs";
import getMovieTrailers from "./movieReducers/getMovieTrailers";
import getMovieReviews from "./movieReducers/getMovieReviews";
import getMovieFavorites from "./movieReducers/getMovieFavorites";
import getMoviesRated from "./movieReducers/getMoviesRated";
import rateMovie from "./movieReducers/rateMovie";

import postTVAiringToday from "./TVReducers/postTVAiringToday";
import postTVPopular from "./TVReducers/postTVPopular";
import postTVOnTheAir from "./TVReducers/postTVOnTheAir";
import postTVTopRated from "./TVReducers/postTVTopRated";
import getTVDetails from "./TVReducers/getTVDetails";
import getTVRecommendations from "./TVReducers/getTVRecommendations";
import getTVCredits from "./TVReducers/getTVCredits";
import getTVExternalIDs from "./TVReducers/getTVExternalIDs";
import getTVTrailers from "./TVReducers/getTVTrailers";
import getTVReviews from "./TVReducers/getTVReviews";
import getTVFavorites from "./TVReducers/getTVFavorites";
import getTVRated from "./TVReducers/getTVRated";

import getPeopleDetails from "./peopleReducers/getPeopleDetails";
import getPeopleCombinedCredits from "./peopleReducers/getPeopleCombinedCredits";
import getPeoplePopular from "./peopleReducers/getPeoplePopular";

import getDiscover from "./getDiscover";

const rootReducer = combineReducers({
  PostMDBConfig: PostMDBConfigReducer,

  getRequestToken,
  getSession,
  deleteSession,
  getGuestSession,
  toggleLogInStatus,
  getUserDetails,

  setItemType,
  searchData,
  postSearchResults,

  postMovieGenres,
  postTVGenres,

  postMoviesNowPlaying,
  postMoviesPopular,
  postMoviesTopRated,
  postMoviesUpcoming,
  getMovieDetails,
  getMovieRecommendations,
  getMovieCredits,
  getMovieExternalIDs,
  getMovieTrailers,
  getMovieReviews,
  getMovieFavorites,
  getMoviesRated,
  rateMovie,

  postTVAiringToday,
  postTVPopular,
  postTVOnTheAir,
  postTVTopRated,
  getTVDetails,
  getTVRecommendations,
  getTVCredits,
  getTVExternalIDs,
  getTVTrailers,
  getTVReviews,
  getTVFavorites,
  getTVRated,

  getPeopleDetails,
  getPeopleCombinedCredits,
  getPeoplePopular,

  getDiscover
});

export default rootReducer;
