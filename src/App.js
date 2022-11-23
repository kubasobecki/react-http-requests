import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMoviesHandler = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://swapi.py4e.com/api/films/');

            if (!response.ok)
                throw new Error(
                    `Something went wrong 💩. Error ${response.status}`
                );

            const data = await response.json();

            const transformedMovies = data.results.map(movie => {
                return {
                    id: new Date(movie.edited).getTime(),
                    title: movie.title,
                    openingText: movie.opening_crawl,
                    releaseDate: movie.release_date
                };
            });
            setMovies(transformedMovies);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    };

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                {!isLoading && movies.length > 0 && (
                    <MoviesList movies={movies} />
                )}
                {!isLoading && !error && movies.length === 0 && (
                    <p>No movies found</p>
                )}
                {isLoading && <p>Loading data...</p>}
                {!isLoading && error && <p>{error}</p>}
            </section>
        </React.Fragment>
    );
}

export default App;
