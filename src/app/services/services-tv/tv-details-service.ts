import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TvDetailsFace } from '../../interfaces/tvInterfaces';

@Injectable({
  providedIn: 'root',
})
export class TvDetailsService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://api.themoviedb.org/3';
  private readonly TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzYxMjA3Yzk4MDI1ZjBkZDlkN2RjMTQ3NjJiNzcyMyIsIm5iZiI6MTc0NzM2NDkyNC4zMzcsInN1YiI6IjY4MjZhYzNjOTA1OTk2NTJhZWFkYTc5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sen0exBSPtLuOdBL55OGwo-8LcSp4CkWERe8SVa7nP4';
  private headers = new HttpHeaders({
    accept: 'application/json',
    Authorization: `Bearer ${this.TOKEN}`,
  });

  // Movie Details Signals
  tvDetails = signal<TvDetailsFace | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);
 
  // Load TVshow Details by ID
  loadTvDetails(id: number) {
    this.isLoading.set(true);
    this.error.set(null);
    this.tvDetails.set(null);
    this.http
      .get<TvDetailsFace>(`${this.BASE_URL}/tv/${id}`, {
        headers: this.headers,
      })
      .subscribe({
        next: (tvShow) => {
          this.tvDetails.set(tvShow);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Failed to load TV show details');
          this.isLoading.set(false);
        },
      });
  }
}
