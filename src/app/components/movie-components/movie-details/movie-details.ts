import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { Movie } from '../../../interfaces/interfaces';
import { DetailsService } from '../../../services/services-movie/details-service';
import { WishlistService } from '../../../services/wishlist-service';
import { NgbdRatingDecimal } from '../../rating-decimal/rating-decimal';
import { RecommendedMovies } from '../recommended-movies/recommended-movies';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
  imports: [NgbdRatingDecimal, RecommendedMovies, NgbAccordionModule],
})
export class MovieDetails {
  // Inject route and details service
  private route = inject(ActivatedRoute);
  private detailsService = inject(DetailsService);

  // Movie details and loading/error states
  movie = this.detailsService.movieDetails;
  isLoading = this.detailsService.isLoading;
  error = this.detailsService.error;
  // Access wishlist service
  wishlistService = inject(WishlistService);

  // Toggle movie in wishlist, prevent event bubbling
  toggleWishlist(event: Event, movie: Movie) {
    event.stopPropagation();
    this.wishlistService.toggle(movie);
  }
  // Check if movie is in wishlist
  isInWishlist(movie: Movie) {
    return this.wishlistService.isIn(movie);
  }
  // Reviews and their loading/error states
  reviews = this.detailsService.reviews;
  isLoadingReviews = this.detailsService.isLoadingReviews;
  reviewsError = this.detailsService.reviewsError;

  constructor() {
    // Load movie details and reviews when route param changes
    effect(() => {
      this.route.params.subscribe((params) => {
        const movieId = +params['id'];
        if (movieId) {
          this.detailsService.loadMovieDetails(movieId);
          this.detailsService.loadReviews(movieId);
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
      });
    });
  }
}
