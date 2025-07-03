import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../services/wishlist-service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieService } from '../../services/services-movie/movie-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, NgbCollapseModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  // Access wishlist and movie services
  wishlistService = inject(WishlistService);
  movieService = inject(MovieService);

  // Wishlist counter signal
  counter = this.wishlistService.counter;
  isMenuCollapsed = true;

  // Supported languages for selection
  languages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'Arabic' },
    { code: 'fr', label: 'French' },
    { code: 'zh', label: 'Chinese' },
  ];

  // Currently selected language
  selectedLanguage = this.movieService.language();

  // Handle language change and update direction
  onLanguageChange(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.selectedLanguage = lang;
    this.movieService.setLanguage(lang);
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
