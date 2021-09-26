import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { fetchPopularMoviesOfTheDay } from '../API/themoviedb';

export default function HomeView() {
  const { url } = useRouteMatch();

  //  const { url, path } = useRouteMatch();
  const [popularMovies, setPopularMovies] = useState(null);

  useEffect(() => {
    fetchPopularMoviesOfTheDay()
      .then(res => res.results)
      .then(setPopularMovies);
  }, []);

  return (
    <>
      <h2>Trending today</h2>
      {popularMovies && (
        <ul>
          {popularMovies.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
