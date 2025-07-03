import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/movie-components/landing/landing').then(
        (m) => m.Landing
      ),
  },
  {
    path: 'tvshow',
    loadComponent: () =>
      import('./components/tv-compoments/tv-page/tv-page').then(
        (m) => m.TvPage
      ),
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./components/wishlist/wishlist').then((m) => m.Wishlist),
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./components/movie-components/movie-details/movie-details').then(
        (m) => m.MovieDetails
      ),
  },
  {
    path: 'tvShow/:id',
    loadComponent: () =>
      import('./components/tv-compoments/tv-details/tv-details').then(
        (m) => m.TvDetails
      ),
  },
  {
    path: 'search/:query',
    loadComponent: () =>
      import('./components/movie-components/search/search').then(
        (m) => m.Search
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found').then((m) => m.NotFound),
  },
];
