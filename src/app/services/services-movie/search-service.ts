import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { Movie } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://api.themoviedb.org/3';
  private readonly TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzYxMjA3Yzk4MDI1ZjBkZDlkN2RjMTQ3NjJiNzcyMyIsIm5iZiI6MTc0NzM2NDkyNC4zMzcsInN1YiI6IjY4MjZhYzNjOTA1OTk2NTJhZWFkYTc5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sen0exBSPtLuOdBL55OGwo-8LcSp4CkWERe8SVa7nP4';
  private headers = new HttpHeaders({
    accept: 'application/json',
    Authorization: `Bearer ${this.TOKEN}`,
  });

  // Signals for search results and loading/error state
  searchResults = signal<Movie[]>([]);
  isLoadingSearch = signal(false);
  searchError = signal<string | null>(null);

  // Search movies by name
  searchMovies(movieName: string) {
    this.isLoadingSearch.set(true);
    this.searchError.set(null);
    this.http
      .get<{ results: Movie[] }>(
        `${this.BASE_URL}/search/movie?include_adult=false&query=${movieName}`,
        {
          headers: this.headers,
        }
      )
      .pipe(map((res) => res.results))
      .subscribe({
        next: (movies) => {
          this.searchResults.set(movies);
          this.isLoadingSearch.set(false);
        },
        error: (err) => {
          this.searchError.set('Failed to Search movies');
          this.isLoadingSearch.set(false);
        },
      });
  }
}
