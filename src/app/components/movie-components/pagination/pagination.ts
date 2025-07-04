import { Component, effect, inject } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieService } from '../../../services/services-movie/movie-service';

@Component({
  selector: 'app-pagination',
  imports: [NgbPaginationModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  movieService = inject(MovieService);
  private _page = 1;
  get page() {
    return this._page;
  }
  set page(value: number) {
    this._page = value;
    this.movieService.setCurrentPage(value);
  }
  constructor() {
    effect(() => {
      this.movieService.loadNowPlaying();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
}
