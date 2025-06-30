import { computed, Injectable, signal } from '@angular/core';
import { MovieResults } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  // Signal holding the current wishlist as an array of MovieResults
  wishlist = signal<MovieResults[]>([]);

  // Computed property to get the count of movies in the wishlist
  counter = computed(() => this.wishlist().length);

  // Toggle a movie in the wishlist: add if not present, remove if present
  toggle(movie: MovieResults) {
    const exist = this.wishlist().some((m) => m.id === movie.id);
    if (exist) {
      // Remove the movie if it already exists in the wishlist
      this.wishlist.update((current) =>
        current.filter((m) => m.id !== movie.id)
      );
    } else {
      // Add the movie if it does not exist in the wishlist
      this.wishlist.update((current) => [...current, movie]);
    }
  }
  // Check if a movie is in the wishlist
  isIn(movie: MovieResults) {
    return this.wishlist().some((m) => m.id === movie.id);
  }
  // Remove a movie from the wishlist
  remove(movie: MovieResults) {
    this.wishlist.update((current) => current.filter((m) => m.id !== movie.id));
  }
  clear(){
    this.wishlist.set([])
  }
}
