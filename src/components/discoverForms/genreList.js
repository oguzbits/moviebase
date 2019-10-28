import React from "react";

const GenreList = props => {
  return (
    <React.Fragment>
      {props.Genres.map(
        genre => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        )
        // ({ key: genre.id, text: genre.name, value: genre })
      )}
    </React.Fragment>
  );
};
export default GenreList;
