import React from 'react';
import {useState, useEffect} from 'react';
import MovieEntry from './MovieEntry.jsx';

const App = (props) => {

  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState(movies);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [newMovie, setNewMovie] = useState('');
  const [emptySearch, setEmptySearch] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);

    let filtered = movies.filter((movie) => {

        return movie.title.toLowerCase().includes(query)
      }
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
    setMovies(
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

  const onToggleWatch = async(e) => {
    e.preventDefault();

    let id = e.target.id;
    // make call to api to update the watched variable by sending the id
    console.log(id);
    let res = await fetch('http://localhost:3000/api/movies', {
      method: "PUT",
      body: JSON.stringify({id: id}),
      headers: new Headers({'Content-Type': 'application/json'})
    })
    initialData();
    // let newState = searchedMovies.slice();
    // let index = newState.findIndex((item) => item.id === Number(id))
    // newState[index]['watched'] = !newState[index]['watched'];
    // setSearchedMovies(newState);
  };

  const onToggleViewWatch = (e) => {
    e.preventDefault();
    setSearch(true);

    let viewStatus = e.target.value;
    console.log('viewStatus is', viewStatus, 'movies is ', movies)
    let filtered = movies.filter((movie) => {
     return (String(movie.watched) === String(viewStatus))
    });
    setSearchedMovies(filtered);
  }

  const onClickViewDescription = (e) => {
    e.preventDefault();
    setSearch(true);
    let id = e.target.id;
    let newState = searchedMovies.slice();

    let index = newState.findIndex((item) => item.id === Number(id))
    newState[index]['viewDescription'] = !newState[index]['viewDescription'];
    setSearchedMovies(newState);
  }

  let callasync = async(query) => {
    let params = query || 'Mean Girls';
    let res = await fetch ('http://localhost:3000/api/movies?query=' + params, {
      method: "POST",
      mode: "cors"
    })
    let data = await res.json();

    return data;
  }

  const initialData = async() => {
    //make call to get all sql values
    let res = await fetch ('http://localhost:3000/api/movies', {
      mode: "cors"
    })
    let data = await res.json();
    data.map((item) => {
      item['viewDescription'] = false;
    })
    setMovies(data);
  }
  useEffect(() => {
    if (!movies.length) {
      initialData();
    } else if (!search) {
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
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value.toLowerCase())}></input>
        <button type="submit">Submit</button>
      </form>
      <button onClick={resetMovies}>See all movies</button>
      <button value={1} onClick={onToggleViewWatch}>Watched</button>
      <button value={0} onClick={onToggleViewWatch}>To Watch</button>
      {emptySearch &&
        <h1>No movies matched search terms. Click 'See all movies' to reset.
        </h1>
      }
    <ol>
      {!emptySearch && searchedMovies.map((item, index) =>
        <MovieEntry movie={item} key={index} onClick={onToggleWatch} onClickViewDescription={onClickViewDescription}/>
        )}
    </ol>
    </div>
  );
};

export default App;