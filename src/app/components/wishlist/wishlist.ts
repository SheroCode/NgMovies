import { Component, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [RouterModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export class Wishlist {
  wishlistService = inject(WishlistService);
  wishlist = this.wishlistService.wishlist;
}
