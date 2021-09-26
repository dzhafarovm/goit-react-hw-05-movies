import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieActors } from '../API/themoviedb';
import css from './MovieCast.module.css';

export default function MovieCast({ movieId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    fetchMovieActors(movieId)
      .then(res => res.cast)
      .then(setCast);
  }, [movieId]);

  return (
    <>
      {cast && (
        <ul>
          {cast.map(actor => {
            return (
              <li key={actor.id}>
                <div>
                  <img
                    className={css.actorImg}
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : 'https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg'
                    }
                    alt={actor.original_name}
                  />
                </div>
                <p className={css.actorName}>{actor.original_name}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

MovieCast.propTypes = {
  movieId: PropTypes.number.isRequired,
};
