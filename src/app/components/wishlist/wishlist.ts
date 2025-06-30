import { Component, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist-service';
import { RouterModule } from '@angular/router';
import { MovieResults } from '../../interfaces/interfaces';
import { NgbdRatingDecimal } from "../rating-decimal/rating-decimal";

@Component({
  selector: 'app-wishlist',
  imports: [RouterModule, NgbdRatingDecimal],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export class Wishlist {
  wishlistService = inject(WishlistService);
  wishlist = this.wishlistService.wishlist;
  removeMovie(movie: MovieResults) {
    this.wishlistService.remove(movie);
  }

  clearWishlist() {
    this.wishlistService.clear();
  }
}
