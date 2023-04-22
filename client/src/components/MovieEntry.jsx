import React from 'react';

const MovieEntry = ({movie, onClick, onClickViewDescription}) => {
  let watchString = movie.watched ? 'Watched' : 'To Watch';
  let buttonString = movie.watched ? 'Mark as to Watch' : 'Mark as Watched'

  return (
    <li>
      <h2 onClick={onClickViewDescription} id={movie.id}>{movie.title}</h2>
      {movie.viewDescription &&
        <div>
          <h3>Release Date: {movie.releaseDate}</h3>
          <h3>Overview: <p>{movie.overview}</p></h3>
          <h3>Rating: <p>{movie.rating}</p></h3>
          <p>{watchString}<button onClick={onClick} id={movie.id}>{buttonString}</button></p>
        </div>

      }

    </li>
  );
};

export default MovieEntry;