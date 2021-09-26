import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './Components/AppBar/AppBar.jsx';
import { LoaderSpinner } from './Components/LoaderSpinner/LoaderSpinner.jsx';

const HomeView = lazy(() =>
  import('./Components/Views/HomeView.jsx' /* webpackChunkName: "HomeView" */),
);
const MoviesView = lazy(() =>
  import(
    './Components/Views/MoviesView.jsx' /* webpackChunkName: "MoviesView" */
  ),
);
const MovieDetailsView = lazy(() =>
  import(
    './Components/Views/MovieDetailsView.jsx' /* webpackChunkName: "MovieDetailsView" */
  ),
);
const NotFoundView = lazy(() =>
  import(
    './Components/Views/NotFoundView.jsx' /* webpackChunkName: "NotFoundView" */
  ),
);

export default function App() {
  return (
    <>
      <AppBar />

      <Suspense fallback={<LoaderSpinner />}>
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
      </Suspense>
    </>
  );
}
