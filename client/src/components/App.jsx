import React from 'react';
import {useState, useEffect} from 'react';
import MovieEntry from './MovieEntry.jsx';

const App = (props) => {
  const allMovies = [
    {title: 'Mean Girls',
    year: '22',
    runtime: '100',
    metascore: '45',
    imdbRating:'6',
    watched: true,
    viewDescription: false,
    },
    {title: 'Hackers',
    year: '2442',
    Runtime: '100d',
    Metascore: 'ad5',
    imdbRating:'6dasf',
    watched: false,
    viewDescription: false,
    },
  ]

  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState(movies);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [newMovie, setNewMovie] = useState('');
  const [emptySearch, setEmptySearch] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    let filtered = movies.filter((movie) =>
        movie.title.includes(query)
    );

    if (!filtered.length) {
      setEmptySearch(true);
    }
    setSearchedMovies(filtered);
    setQuery('');
  }

  const addMovie = async (e) => {
    e.preventDefault();
    setSearch(false);
    if (!newMovie.length) {
      return;
    };

    let movieData = await callasync(newMovie);
    console.log(movieData);
    setMovies(
      // [...movies, {original_title: newMovie, watched: false}]
      movies.concat(movieData)
    );
    setNewMovie('');

  }

  const resetMovies = (e) => {
    e.preventDefault();
    setSearch(false);
    setSearchedMovies(movies);
    setEmptySearch(false);
  ;}

  const onToggleWatch = (e) => {
    e.preventDefault();
    let id = e.target.id;
    let newState = searchedMovies.slice();
    newState[id]['watched'] = !newState[id]['watched'];
    setSearchedMovies(newState);
  };

  const onToggleViewWatch = (e) => {
    e.preventDefault();
    setSearch(true);
    let viewStatus = e.target.value;
    let filtered = movies.filter((movie) => (String(movie.watched) === viewStatus));
    setSearchedMovies(filtered);
  }

  const onClickViewDescription = (e) => {
    e.preventDefault();
    setSearch(true);
    let id = e.target.id;
    let newState = searchedMovies.slice();
    newState[id]['viewDescription'] = !newState[id]['viewDescription'];
    setSearchedMovies(newState);
  }

  let callasync = async(query) => {
    query = query || 'Mean Girls';
    query = query.match(/\b(\w+)\b/g);

    let queryString = '';
    query.forEach((word) => {
      queryString += word;
      queryString += "+";
    })

    queryString = queryString.slice(0, - 1)


    let res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e014e19f6fda575b88ede7b232052a98&query=${queryString}`)
    let json = await res.json();

    let data = json.results.map((movie) => {
      movie['watched'] = false;
      return movie
    });

    if (!movies.length) {
      setMovies(data);
    }

    return data;
  }

  useEffect(() => {
    if (!movies.length) {
      callasync();
    }
    else if (!search) {
      setSearchedMovies(movies);
    }

  }, [movies, searchedMovies]);

  return (
    <div>
      <form onSubmit={addMovie}>
        <input value={newMovie} onChange={(e) => setNewMovie(e.target.value)}></input>
        <button type="submit">Add movie</button>
      </form>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}></input>
        <button type="submit">Submit</button>
      </form>
      <button onClick={resetMovies}>See all movies</button>
      <button value={true} onClick={onToggleViewWatch}>Watched</button>
      <button value={false} onClick={onToggleViewWatch}>To Watch</button>
      {emptySearch &&
        <h1>No movies matched search terms. Click 'See all movies' to reset.
        </h1>
      }
    <ol>
      {!emptySearch && searchedMovies.map((item, index) =>
        <MovieEntry movie={item} key={index} index={index} onClick={onToggleWatch} onClickViewDescription={onClickViewDescription}/>)}
    </ol>
    </div>
  );
};

export default App;