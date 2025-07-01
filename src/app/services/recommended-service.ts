import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MovieResults } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RecommendedService {
  private readonly BASE_URL = 'https://api.themoviedb.org/3';
  private readonly TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzYxMjA3Yzk4MDI1ZjBkZDlkN2RjMTQ3NjJiNzcyMyIsIm5iZiI6MTc0NzM2NDkyNC4zMzcsInN1YiI6IjY4MjZhYzNjOTA1OTk2NTJhZWFkYTc5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sen0exBSPtLuOdBL55OGwo-8LcSp4CkWERe8SVa7nP4';

  private headers = new HttpHeaders({
    accept: 'application/json',
    Authorization: `Bearer ${this.TOKEN}`,
  });

  private http = inject(HttpClient);

  recommended = signal<MovieResults[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  load(movieId: number) {
    this.isLoading.set(true);
    this.error.set(null);

    this.http
      .get<{ results: MovieResults[] }>(
        `${this.BASE_URL}/movie/${movieId}/recommendations`,
        { headers: this.headers }
      )
      .subscribe({
        next: (res) => {
          this.recommended.set(res.results);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Failed to load recommended movies');
          this.isLoading.set(false);
        },
      });
  }
}
