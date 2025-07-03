import { Component, computed, inject, input } from '@angular/core';
import { MovieResults } from '../../../interfaces/interfaces';
import { WishlistService } from '../../../services/wishlist-service';
import { CircularProgress } from '../../circular-progress/circular-progress';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [CircularProgress, RouterModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  // Movie input property
  movie = input<MovieResults>();
  // Compute image URL for the movie poster
  imageUrl = computed(
    () =>
      'https://image.tmdb.org/t/p/w500' + this.movie()?.poster_path ||
      this.movie()?.backdrop_path
  );
  // Access wishlist service
  wishlistService = inject(WishlistService);

  // Toggle movie in wishlist, prevent event bubbling
  toggleWishlist(event: Event, movie: MovieResults) {
    event.stopPropagation();
    this.wishlistService.toggle(movie);
  }
  // Check if movie is in wishlist
  isInWishlist(movie: MovieResults) {
    return this.wishlistService.isIn(movie);
  }
}
