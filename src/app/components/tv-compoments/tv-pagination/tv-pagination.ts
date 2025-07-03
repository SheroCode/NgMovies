import { Component, effect, inject } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TvshowService } from '../../../services/services-tv/tvshow-service';

@Component({
  selector: 'app-tv-pagination',
  imports: [NgbPaginationModule],
  templateUrl: './tv-pagination.html',
  styleUrl: './tv-pagination.scss',
})
export class TvPagination {
  tvshowService = inject(TvshowService);
  private _page = 1;
  get page() {
    return this._page;
  }
  set page(value: number) {
    this._page = value;
    this.tvshowService.setCurrentPage(value);
  }
  constructor() {
    effect(() => {
      this.tvshowService.loadPopular();
      
    });
  }
}
