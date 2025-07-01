import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MovieDetailsFace, ReviewFace } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://api.themoviedb.org/3';
  private readonly TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzYxMjA3Yzk4MDI1ZjBkZDlkN2RjMTQ3NjJiNzcyMyIsIm5iZiI6MTc0NzM2NDkyNC4zMzcsInN1YiI6IjY4MjZhYzNjOTA1OTk2NTJhZWFkYTc5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sen0exBSPtLuOdBL55OGwo-8LcSp4CkWERe8SVa7nP4';
  private headers = new HttpHeaders({
    accept: 'application/json',
    Authorization: `Bearer ${this.TOKEN}`,
  });

  // Movie Details Signals
  movieDetails = signal<MovieDetailsFace | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);
  // Reviews Signals
  reviews = signal<ReviewFace[] >([]);
  isLoadingReviews = signal(false);
  reviewsError = signal<string | null>(null);

  // Load Movie Details by ID
  loadMovieDetails(id: number) {
    this.isLoading.set(true);
    this.error.set(null);
    this.movieDetails.set(null);
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
  // Load Reviews by Movie ID
  loadReviews(id: number) {
    this.isLoadingReviews.set(true);
    this.reviewsError.set(null);
    this.http
      .get<{ results: ReviewFace[] }>(`${this.BASE_URL}/movie/${id}/reviews`, {
        headers: this.headers,
      })
      .subscribe({
        next: (response) => {
          this.reviews.set(response.results);
          this.isLoadingReviews.set(false);
        },
        error: () => {
          this.reviewsError.set('Failed to load movie details');
          this.isLoadingReviews.set(false);
        },
      });
  }
}
