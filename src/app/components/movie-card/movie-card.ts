import { Component, computed, inject, input, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { MovieResults } from '../../interfaces/interfaces';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  movie = input<MovieResults>();
   imageUrl = computed(() => 'https://image.tmdb.org/t/p/w500' + this.movie()?.poster_path);
}
