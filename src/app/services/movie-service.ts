import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { MovieResults , NowPlayingResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://api.themoviedb.org/3';
  private readonly TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzYxMjA3Yzk4MDI1ZjBkZDlkN2RjMTQ3NjJiNzcyMyIsIm5iZiI6MTc0NzM2NDkyNC4zMzcsInN1YiI6IjY4MjZhYzNjOTA1OTk2NTJhZWFkYTc5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sen0exBSPtLuOdBL55OGwo-8LcSp4CkWERe8SVa7nP4';
  private headers = new HttpHeaders({
    accept: 'application/json',
    Authorization: `Bearer ${this.TOKEN} `,
  });
  // / signal to hold movies
  nowPlaying = signal<MovieResults[]>([]);
  isLoading = signal(false);
  currentPage = signal<number>(1);
  error = signal<string | null>(null);

  setCurrentPage(page: number) {
    this.currentPage.set(page);
  }
  
  loadNowPlaying() {
    this.isLoading.set(true);
    this.error.set(null);
    this.http
      .get<NowPlayingResponse>(
        `${this.BASE_URL}/movie/now_playing?language=en-US&page=${this.currentPage()}`,
        {
          headers: this.headers,
        }
      )
      .pipe(map((res) => res.results))
      .subscribe({
        next: (movies) => {
          this.nowPlaying.set(movies);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load movies');
          this.isLoading.set(false);
        },
      });
  }
}
