import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMoviesHandler = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        fetchMoviesHandler();
    }, [fetchMoviesHandler]);

    let content = <p>No movies found</p>;

    if (movies.length > 0) content = <MoviesList movies={movies} />;
    if (error) content = <p>{error}</p>;
    if (isLoading) content = <p>Loading data...</p>;

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>{content}</section>
        </React.Fragment>
    );
}

export default App;
