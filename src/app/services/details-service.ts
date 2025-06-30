import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MovieDetailsFace } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  private readonly BASE_URL = 'https://api.themoviedb.org/3';
  private readonly TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzYxMjA3Yzk4MDI1ZjBkZDlkN2RjMTQ3NjJiNzcyMyIsIm5iZiI6MTc0NzM2NDkyNC4zMzcsInN1YiI6IjY4MjZhYzNjOTA1OTk2NTJhZWFkYTc5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sen0exBSPtLuOdBL55OGwo-8LcSp4CkWERe8SVa7nP4';

  private headers = new HttpHeaders({
    accept: 'application/json',
    Authorization: `Bearer ${this.TOKEN}`,
  });

  private http = inject(HttpClient);

  // signals
  movieDetails = signal<MovieDetailsFace | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  /**
   * Loads detailed info for a movie by ID
   */
  loadMovieDetails(id: number) {
    this.isLoading.set(true);
    this.error.set(null);

    this.http
      .get<MovieDetailsFace>(`${this.BASE_URL}/movie/${id}`, {
        headers: this.headers,
      })
      .subscribe({
        next: (movie) => {
          this.movieDetails.set(movie);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Failed to load movie details');
          this.isLoading.set(false);
        },
      });
  }
}
