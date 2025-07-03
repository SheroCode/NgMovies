import { Component, computed, effect, inject, input } from '@angular/core';
import { MovieCard } from '../movie-card/movie-card';
import { Movie } from '../../../interfaces/interfaces';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RecommendedService } from '../../../services/services-movie/recommended-service';

@Component({
  selector: 'app-recommended-movies',
  imports: [MovieCard, NgbCarouselModule],
  templateUrl: './recommended-movies.html',
  styleUrl: './recommended-movies.scss',
})
export class RecommendedMovies {
  private service = inject(RecommendedService);


  // Movie ID input for fetching recommendations
  movieId = input<number>();

  // Signals for recommended movies and loading/error state
  recommended = this.service.recommended;
  isLoading = this.service.isLoading;
  error = this.service.error;

  // Chunk recommended movies into groups of 3 for carousel slides
  chunkedRecommended = computed(() => {
    const items = this.recommended();
    const chunks: Movie[][] = [];
    for (let i = 0; i < items.length; i += 3) {
      chunks.push(items.slice(i, i + 3));
    }
    return chunks;
  });

  constructor() {
    // Load recommendations when movieId changes
    effect(() => {
      const id = this.movieId();
      if (id) this.service.load(id);
    });
  }
}
