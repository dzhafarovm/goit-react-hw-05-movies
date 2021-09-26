import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieReviews } from '../API/themoviedb';
import css from './MovieReviews.module.css';

export default function MovieReviews({ movieId }) {
  const [notReviews, setNotReviews] = useState(false);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchMovieReviews(movieId)
      .then(res => {
        if (res.results.length === 0) {
          setNotReviews(true);
        } else return res.results;
      })
      .then(setReviews);
  }, [movieId]);

  return (
    <>
      {notReviews && <p>We don't have any rewiews for this movie</p>}

      {reviews && (
        <ul>
          {reviews.map(review => {
            return (
              <li key={review.id}>
                <p className={css.author}>{review.author}</p>
                <p className={css.content}>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

MovieReviews.propTypes = {
  movieId: PropTypes.number.isRequired,
};
