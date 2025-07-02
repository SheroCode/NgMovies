import { Component, inject, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search-service';
import { MovieCard } from '../movie-card/movie-card';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MovieCard, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private searchService = inject(SearchService);

  searchResults = this.searchService.searchResults;
  isLoadingSearch = this.searchService.isLoadingSearch;
  searchError = this.searchService.searchError;

  movieName = '';
  hasSearched = signal(false);

  constructor() {
    
    effect(() => {
      this.route.paramMap.subscribe((params) => {
        const query = params.get('query');
        if (query) {
          this.movieName = query;
          this.hasSearched.set(true);
          this.searchService.searchMovies(query);
        }
      });
    });
  }

  onSearch() {
    const query = this.movieName.trim();
    if (query) {
      
      this.router.navigate(['/search', query]);
    }
  }
}
