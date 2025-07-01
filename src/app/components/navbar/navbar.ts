import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../services/wishlist-service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,NgbCollapseModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
wishlistService=inject(WishlistService);
counter=this.wishlistService.counter;
	isMenuCollapsed = true;

}
