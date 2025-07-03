import { Component, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist-service';
import { RouterModule } from '@angular/router';
import { Movie } from '../../interfaces/interfaces';
import { NgbdRatingDecimal } from '../rating-decimal/rating-decimal';

@Component({
  selector: 'app-wishlist',
  imports: [RouterModule, NgbdRatingDecimal],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export class Wishlist {
  // Access wishlist service
  wishlistService = inject(WishlistService);
  // Signal for wishlist movies
  wishlist = this.wishlistService.wishlist;

  // Remove a single movie from wishlist
  removeMovie(movie: Movie) {
    this.wishlistService.remove(movie);
  }

  // Clear all movies from wishlist
  clearWishlist() {
    this.wishlistService.clear();
  }
}
