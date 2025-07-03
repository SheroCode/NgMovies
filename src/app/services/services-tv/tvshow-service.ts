import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { TvResponse, TvShow } from '../../interfaces/tvInterfaces';


@Injectable({
  providedIn: 'root',
})
export class TvshowService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://api.themoviedb.org/3';
  private readonly TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzYxMjA3Yzk4MDI1ZjBkZDlkN2RjMTQ3NjJiNzcyMyIsIm5iZiI6MTc0NzM2NDkyNC4zMzcsInN1YiI6IjY4MjZhYzNjOTA1OTk2NTJhZWFkYTc5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sen0exBSPtLuOdBL55OGwo-8LcSp4CkWERe8SVa7nP4'; // الأفضل تخزينها في environment

  private headers = new HttpHeaders({
    accept: 'application/json',
    Authorization: `Bearer ${this.TOKEN}`,
  });

  popular = signal<TvShow[]>([]);
  isLoading = signal(false);
  currentPage = signal<number>(1);
  error = signal<string | null>(null);
  language = signal('en');

  constructor() {
    effect(() => {
      this.loadPopular();
    });
  }

  setCurrentPage(page: number) {
    if (page < 1) return;
    this.currentPage.set(page);
  }

  setLanguage(lang: string) {
    this.language.set(lang);
  }

  loadPopular() {
    this.isLoading.set(true);
    this.error.set(null);
    const lang = this.language();

    this.http
      .get<TvResponse>(
        `${this.BASE_URL}/tv/popular?language=${lang}&page=${this.currentPage()}`,
        { headers: this.headers }
      )
      .pipe(map((res) => res.results))
      .subscribe({
        next: (tvShow) => {
          this.popular.set(tvShow);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('Failed to load TV shows.');
          this.isLoading.set(false);
        },
      });
  }
}
