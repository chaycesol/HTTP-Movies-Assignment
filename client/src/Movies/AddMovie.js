import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
  }

const AddMovie = ({movieList, setMovieList}) => {


    const { push } = useHistory();  
    const [addMovie, setAddMovie] = useState(initialMovie);

    useEffect(() => {
        getData();
    }, [movieList])

    const getData = () => {
        axios
        .get('http://localhost:5000/api/movies')
        .then((res) => {
          setMovieList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        setAddMovie({
            ...addMovie,
            [ev.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/movies', addMovie)
        .then((res) => {
            console.log(res)
        setMovieList([...movieList], res.data);
        push('/');
        })
        .catch((err) => console.warn('POST ERROR: ' + err))
    };
    return(
        <div>
            <h2>Add A Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                type='text'
                name='title'
                onChange={changeHandler}
                placeholder="Enter Movie Title"
                value={addMovie.title} 
                />
                <input
                type='text'
                name='director'
                onChange={changeHandler}
                placeholder="Enter Director's Name"
                value={addMovie.director} 
                />
                <input
                type='number'
                name='metascore'
                onChange={changeHandler}
                placeholder="Enter Movie's Metascore"
                value={addMovie.metascore} 
                />
                <input
                type='text'
                name='stars'
                onChange={changeHandler}
                placeholder="Please only one stars name!"
                value={addMovie.stars}
                />
                <button type="submit">Add New Movie</button>
            </form>
        </div>
        
    )
    
}

export default AddMovie;