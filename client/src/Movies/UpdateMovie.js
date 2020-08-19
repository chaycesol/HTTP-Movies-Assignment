import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom'
import axios from 'axios';


const UpdateMovie = ({match, movieList, setMovieList}) => {
    const initialValues = {
        title: '',
        director: '',
        metascore: null,
        stars: [],
    };
    
    const [movieInput, setMovieInput] = useState(initialValues)
    const location = useLocation();
    const params = useParams();
    const { push } = useHistory();

    const movie = movieList.find((thing) => `$(thing.id)` === match.params.id)

    useEffect(() => {
        if(location.state) {
            setMovieInput(location.state);
        } else {
            axios.get(`http://localhost:5000/api/movies/${params.id}`)
            .then((res) => {
                setMovieInput(res.data);
            })
            .catch(err => console.warn("GET ISSUE" + err))
        };
    }, []);

    const onChange = (e) => {
        setMovieInput({ ...movieInput, [e.target.name]: e.target.value })
    };

    const onSubmit = (e) => {
        e.preventDefault();
    
        axios
          .put(`http://localhost:5000/api/movies/${movie.id}`, movieInput)
          .then((res) => {
            setMovieList([...movieList], res.data);
            push(`/movies/${movie.id}`);
          });
      };

    return (
        <form onSubmit={onSubmit}>
            <input
            type='text'
            name='title'
            placeholder='Movie Title'
            value={movieInput.title}
            onChange={onChange} 
            />
            <input
            type='text'
            name='director'
            placeholder='Director'
            value={movieInput.director}
            onChange={onChange} 
            />
            <input
            type='text'
            name='metascore'
            placeholder='Metascore'
            value={movieInput.metascore}
            onChange={onChange} 
            />
            <button>Update Movie</button>
        </form>
    )

}

export default UpdateMovie;