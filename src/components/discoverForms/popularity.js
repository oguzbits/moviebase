import React from "react";

export const options = [
  { text: "Popularity Descending", value: "popularity.desc" },
  { text: "Popularity Ascending", value: "popularity.asc" },
  { text: "Rating Descending", value: "vote_average.desc" },
  { text: "Rating Ascending", value: "vote_average.asc" },
  { text: "Release Date Descending", value: "primary_release_date.desc" },
  { text: "Release Date Ascending", value: "primary_release_date.asc" },
  { text: "Title (A-Z)", value: "title.asc" },
  { text: "Title (Z-A)", value: "title.desc" }
];

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
