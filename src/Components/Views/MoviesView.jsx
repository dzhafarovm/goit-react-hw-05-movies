import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { FaSistrix } from 'react-icons/fa';
import { fetchSearchMovieByQuery } from '../API/themoviedb';
import css from './MoviesView.module.css';

export default function MoviesView() {
  window.document.title = 'Movies';

  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(false);

  const query = new URLSearchParams(location.search).get('query') ?? '';

  useEffect(() => {
    if (query.trim() === '') {
      return;
    }

    fetchSearchMovieByQuery(query)
      .then(res => {
        if (res.results.length === 0) {
          setError(true);
          return;
        }
        setError(false);
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
      <form onSubmit={formSubmit} className={css.form}>
        <input type="text" name="inp" placeholder={`enter movie's name`} />
        <button type="submit" className={css.btnSearch}>
          <FaSistrix /> Search
        </button>
      </form>

      {error && <p className={css.error}>Search result "{query}" not found!</p>}
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
