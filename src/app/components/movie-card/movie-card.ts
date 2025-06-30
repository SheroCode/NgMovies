import { Component, computed, inject, input } from '@angular/core';
import { MovieResults } from '../../interfaces/interfaces';
import { WishlistService } from '../../services/wishlist-service';
import { CircularProgress } from '../circular-progress/circular-progress';

@Component({
  selector: 'app-movie-card',
  imports: [CircularProgress],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  movie = input<MovieResults>();
  imageUrl = computed(
    () => 'https://image.tmdb.org/t/p/w500' + this.movie()?.poster_path
  );
  wishlistService = inject(WishlistService);

  toggleWishlist(event: Event, movie: MovieResults) {
    event.stopPropagation();
    this.wishlistService.toggle(movie);
  }
  isInWishlist(movie: MovieResults) {
   return this.wishlistService.isIn(movie);
  }
}
