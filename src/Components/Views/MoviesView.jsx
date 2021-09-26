import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { fetchSearchMovieByQuery } from '../API/themoviedb';

export default function MoviesView() {
  const { url } = useRouteMatch();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [query, setQuery] = useState('');

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

    setQuery(e.target.inp.value);
    e.target.inp.value = '';

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
              <Link to={`${url}/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
