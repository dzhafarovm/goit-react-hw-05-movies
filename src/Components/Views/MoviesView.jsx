import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { fetchSearchMovieByQuery } from '../API/themoviedb';
import css from './HomeView.module.css';

export default function MoviesView() {
  window.document.title = 'movie';

  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const [selectedMovie, setSelectedMovie] = useState(null);

  const query = new URLSearchParams(location.search).get('query') ?? '';

  useEffect(() => {
    if (query.trim() === '') {
      return;
    }

    fetchSearchMovieByQuery(query)
      .then(res => {
        return res.results;
      })
      .then(setSelectedMovie);
  }, [query]);

  const formSubmit = e => {
    e.preventDefault();

    history.push({
      ...location,
      search: `query=${e.target.inp.value}`,
    });

    resetQuery(e);
  };

  const resetQuery = e => (e.target.inp.value = '');

  return (
    <>
      <form onSubmit={formSubmit}>
        <input type="text" name="inp" />
        <button type="submit">Search</button>
      </form>

      {selectedMovie && (
        <ul>
          {selectedMovie.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}/${movie.id}`} className={css.link}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// ?query=${e.target.inp.value}
