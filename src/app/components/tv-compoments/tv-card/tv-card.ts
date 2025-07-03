import { Component, computed, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TvShowResults } from '../../../interfaces/tvInterfaces';
import { CircularProgress } from '../../circular-progress/circular-progress';

@Component({
  selector: 'app-tv-card',
  imports: [CircularProgress, RouterModule],
  templateUrl: './tv-card.html',
  styleUrl: './tv-card.scss',
})
export class TvCard {
  // TV show input property
  tvShow = input<TvShowResults>();
  // Compute image URL for the TV show poster
  imageUrl = computed(
    () =>
      'https://image.tmdb.org/t/p/w500' + this.tvShow()?.poster_path ||
      this.tvShow()?.backdrop_path
  );
}
