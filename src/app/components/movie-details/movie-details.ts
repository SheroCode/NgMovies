import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../../services/details-service';
import { NgbdRatingDecimal } from '../rating-decimal/rating-decimal';
import { RecommendedMovies } from '../recommended-movies/recommended-movies';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
  imports: [NgbdRatingDecimal, RecommendedMovies, NgbAccordionModule],
})
export class MovieDetails {
  private route = inject(ActivatedRoute);
  private detailsService = inject(DetailsService);

  // signal for route param
  id = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? +id : 0;
  });

  // signals from service for movie details
  movie = this.detailsService.movieDetails;
  isLoading = this.detailsService.isLoading;
  error = this.detailsService.error;
  // signals from service for movie reviews
  reviews = this.detailsService.reviews;
  isLoadingReviews = this.detailsService.isLoadingReviews;
  reviewsError = this.detailsService.reviewsError;

  constructor() {
    effect(() => {
      const movieId = this.id();
      if (movieId) {
        this.detailsService.loadMovieDetails(movieId);
        this.detailsService.loadReviews(movieId);
      }
    });
  }
}
