import { Component, computed, inject, input } from '@angular/core';
import { Movie } from '../../../interfaces/interfaces';
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
  movie = input<Movie>();
  // Compute image URL for the movie poster
  imageUrl = computed(
    () =>
      'https://image.tmdb.org/t/p/w500' + this.movie()?.poster_path ||
      this.movie()?.backdrop_path
  );
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
}
