import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie';
import AddMovie from './Movies/AddMovie';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route
        exact
        path='/'
        render={(props) => (
          <MovieList
            {...props}
            movies={movieList}
            setMovieList={setMovieList}
          />
        )}
      />

<Route
        path='/movies/:id'
        render={(props) => (
          <Movie
            {...props}
            addToSavedList={addToSavedList}
            movieList={movieList}
            setMovieList={setMovieList}
          />
        )}
      />

      <Route
        path='/update-movie/:id'
        render={(props) => (
          <UpdateMovie
            {...props}
            movieList={movieList}
            setMovieList={setMovieList}
          />
        )}
      />
      <Route
        path='/add-movie/'
        render={(props) => (
          <AddMovie
            {...props}
            movieList={movieList}
            setMovieList={setMovieList}
          />
        )}
      />
    </>
  );
};

export default App;
