import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../services/wishlist-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
wishlistService=inject(WishlistService);
counter=this.wishlistService.counter;
}
