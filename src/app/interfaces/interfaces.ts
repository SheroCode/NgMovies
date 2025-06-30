export interface MovieResults {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // ISO format string (e.g., "2025-05-14")
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface NowPlayingResponse {
  results: MovieResults[];
}
