import React from 'react';

const MovieEntry = ({movie, index, onClick, onClickViewDescription}) => {
  let watchString = movie.watched ? 'Watched' : 'To Watch';
  let buttonString = movie.watched ? 'Mark as to Watch' : 'Mark as Watched'
  return (
    <li>
      <h2 onClick={onClickViewDescription} id={index}>{movie.original_title}</h2>
      {movie.viewDescription &&
        <div>
          <h3>Year Released: {movie.release_date.slice(0,3)}</h3>
          <h3>Overview: <p>{movie.overview}</p></h3>
          <h3>Rating: <p>{movie.vote_average}</p></h3>
          <p>{watchString}<button onClick={onClick} id={index}>{buttonString}</button></p>
        </div>

      }

    </li>
  );
};

export default MovieEntry;