import { Component, computed, effect, inject, input } from '@angular/core';
import { RecommendedService } from '../../services/recommended-service';
import { MovieCard } from '../movie-card/movie-card';
import { MovieResults } from '../../interfaces/interfaces';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recommended-movies',
  imports: [MovieCard,NgbCarouselModule],
  templateUrl: './recommended-movies.html',
  styleUrl: './recommended-movies.scss',
})
export class RecommendedMovies {
  private service = inject(RecommendedService);

  movieId = input<number>();

  recommended = this.service.recommended;
  isLoading = this.service.isLoading;
  error = this.service.error;
  // Computed signal to chunk movies into groups of 4 per slide
  chunkedRecommended = computed(() => {
    const items = this.recommended();
    const chunks: MovieResults[][] = [];
    for (let i = 0; i < items.length; i += 3) {
      chunks.push(items.slice(i, i + 3));
    }
    return chunks;
  });
  constructor() {
    effect(() => {
      const id = this.movieId();
      if (id) this.service.load(id);
    });
  }
}
