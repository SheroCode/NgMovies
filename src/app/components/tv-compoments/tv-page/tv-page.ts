import { Component, inject } from '@angular/core';
import { TvCard } from '../tv-card/tv-card';
import { TvshowService } from '../../../services/services-tv/tvshow-service';
import { TvPagination } from '../tv-pagination/tv-pagination';

@Component({
  selector: 'app-tv-page',
  imports: [TvPagination, TvCard],
  templateUrl: './tv-page.html',
  styleUrl: './tv-page.scss',
})
export class TvPage {
  private tvshowService = inject(TvshowService);
  popular = this.tvshowService.popular;
  isLoading = this.tvshowService.isLoading;
  error = this.tvshowService.error;
  Array: any;
}
