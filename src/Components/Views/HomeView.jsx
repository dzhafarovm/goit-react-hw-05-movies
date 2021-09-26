import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { fetchPopularMoviesOfTheDay } from '../API/themoviedb';
import css from './HomeView.module.css';

export default function HomeView() {
  window.document.title = 'movie';

  const { url } = useRouteMatch();
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
              <Link to={`${url}movies/${movie.id}`} className={css.link}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
