import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { TvDetailsService } from '../../../services/services-tv/tv-details-service';
import { NgbdRatingDecimal } from '../../rating-decimal/rating-decimal';

@Component({
  selector: 'app-tv-details',
  standalone: true,
  templateUrl: './tv-details.html',
  styleUrl: './tv-details.scss',
  imports: [NgbAccordionModule, NgbdRatingDecimal],
})
export class TvDetails {
  private route = inject(ActivatedRoute);
  private tvDetailsService = inject(TvDetailsService);

  // signal for route param
  id = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? +id : 0;
  });

  // signals from service for tvShow details
  tvShow = this.tvDetailsService.tvDetails;
  isLoading = this.tvDetailsService.isLoading;
  error = this.tvDetailsService.error;

  constructor() {
    effect(() => {
      const tvShowId = this.id();
      if (tvShowId) {
        this.tvDetailsService.loadTvDetails(tvShowId);
      }
    });
  }
}
