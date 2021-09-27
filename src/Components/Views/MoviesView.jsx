import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { FaSistrix, FaFilm } from 'react-icons/fa';
import { fetchSearchMovieByQuery } from '../API/themoviedb';
import css from './MoviesView.module.css';

export default function MoviesView() {
  window.document.title = 'Movies';

  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(false);
  const [attribute, setAttribute] = useState(true);

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

    e.target.reset();
    setAttribute(true);
  };

  return (
    <>
      <form onSubmit={formSubmit} className={css.form}>
        <input
          type="text"
          name="inp"
          placeholder={`Enter movie's name`}
          onChange={e => {
            if (e.target.value.trim()) {
              setAttribute(false);
            } else setAttribute(true);
          }}
        />
        <button type="submit" className={css.btnSearch} disabled={attribute}>
          <FaSistrix /> Search
        </button>
      </form>

      {error && <p className={css.error}>Search result "{query}" not found!</p>}
      {selectedMovie && (
        <ul className={css.list}>
          {selectedMovie.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}/${movie.id}`} className={css.link}>
                <FaFilm size={16} className={css.icon} /> {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
