import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { SearchService } from '../../services/search-service';
import { MovieCard } from '../movie-card/movie-card';
import { Pagination } from '../pagination/pagination';

@Component({
  selector: 'app-landing',
  imports: [MovieCard, Pagination, RouterModule,FormsModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  private movieService = inject(MovieService);
  nowPlaying = this.movieService.nowPlaying;
  isLoading = this.movieService.isLoading;
  error = this.movieService.error;
  //Search logic
  searchService = inject(SearchService);

  movieName: string = ''; // Define and initialize movieName

  constructor() {
    effect(() => {
      this.searchService.searchMovies(this.movieName);
    });
  }
}
