import { computed, Injectable, signal } from '@angular/core';
import { MovieResults } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  // Holds the current wishlist as a signal
  wishlist = signal<MovieResults[]>([]);
  // Number of movies in wishlist
  counter = computed(() => this.wishlist().length);

  // Add or remove a movie from wishlist
  toggle(movie: MovieResults) {
    const exist = this.wishlist().some((m) => m.id === movie.id);
    if (exist) {
      // Remove if already exists
      this.wishlist.update((current) =>
        current.filter((m) => m.id !== movie.id)
      );
    } else {
      // Add if not exists
      this.wishlist.update((current) => [...current, movie]);
    }
  }

  // Check if movie is in wishlist
  isIn(movie: MovieResults) {
    return this.wishlist().some((m) => m.id === movie.id);
  }

  // Remove a movie from wishlist
  remove(movie: MovieResults) {
    this.wishlist.update((current) => current.filter((m) => m.id !== movie.id));
  }

  // Clear all movies from wishlist
  clear() {
    this.wishlist.set([]);
  }
}
