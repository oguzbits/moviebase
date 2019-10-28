import React from "react";

const Popularity = () => {
  return (
    <React.Fragment>
      <option value="popularity.desc">Popularity Descending</option>
      <option value="popularity.asc">Popularity Ascending</option>
      <option value="vote_average.desc">Rating Descending</option>
      <option value="vote_average.asc">Rating Ascending</option>
      <option value="primary_release_date.desc">Release Date Descending</option>
      <option value="primary_release_date.asc">Release Date Ascending</option>
      <option value="title.asc">Title (A-Z)</option>
      <option value="title.desc">Title (Z-A)</option>
    </React.Fragment>
  );
};
export default Popularity;
