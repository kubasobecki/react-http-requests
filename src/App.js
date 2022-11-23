import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);

    const fetchMoviesHandler = () => {
        fetch('https://swapi.py4e.com/api/films/')
            .then(res => res.json())
            .then(data => {
                const transformedMovies = data.results.map(movie => {
                    return {
                        id: new Date(movie.edited).getTime(),
                        title: movie.title,
                        openingText: movie.opening_crawl,
                        releaseDate: movie.release_date
                    };
                });
                setMovies(transformedMovies);
            });
    };

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                <MoviesList movies={movies} />
            </section>
        </React.Fragment>
    );
}

export default App;
