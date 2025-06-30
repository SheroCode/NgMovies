import { computed, Injectable, signal } from '@angular/core';
import { MovieResults } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishlist = signal<MovieResults[]>([]);
  counter = computed(() => this.wishlist().length);

  toggle(movie: MovieResults) {
    const exist = this.wishlist().some((m) => m.id === movie.id);
    if (exist) {
      this.wishlist.update((current) =>
        current.filter((m) => m.id !== movie.id)
      );
    } else {
      this.wishlist.update((current) => [...current, movie]);
    }
  }
  isIn(movie: MovieResults) {
    return this.wishlist().some((m) => m.id === movie.id);
  }
}
