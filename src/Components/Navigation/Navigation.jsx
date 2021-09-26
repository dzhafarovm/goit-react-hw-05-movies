import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={css.list}>
      <NavLink exact to="/" className={css.link} activeClassName={css.active}>
        Home
      </NavLink>

      <NavLink to="/movies" className={css.link} activeClassName={css.active}>
        Movies
      </NavLink>
    </nav>
  );
}
