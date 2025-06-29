import { Component, inject, OnInit } from '@angular/core';
import { MovieCard } from '../movie-card/movie-card';
import { MovieService } from '../../services/movie-service';
import { Pagination } from '../pagination/pagination';

@Component({
  selector: 'app-landing',
  imports: [MovieCard, Pagination],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  private movieService = inject(MovieService);
  nowPlaying = this.movieService.nowPlaying;
  isLoading = this.movieService.isLoading;
  error = this.movieService.error;
}
