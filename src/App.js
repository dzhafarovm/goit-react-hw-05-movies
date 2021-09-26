import { Switch, Route } from 'react-router-dom';
import AppBar from './Components/AppBar/AppBar.jsx';
import HomeView from './Components/Views/HomeView.js.jsx';
import MoviesView from './Components/Views/MoviesView.jsx';
import MovieDetailsView from './Components/Views/MovieDetailsView.jsx';
import NotFoundView from './Components/Views/NotFoundView.jsx';

export default function App() {
  return (
    <>
      <AppBar />

      <Switch>
        <Route path="/" exact>
          <HomeView />
        </Route>

        <Route path="/movies" exact>
          <MoviesView />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailsView />
        </Route>

        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </>
  );
}
