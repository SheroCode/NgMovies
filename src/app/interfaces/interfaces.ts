//interface Movie 
export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any; // or null or a specific interface if needed
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  
}
export interface NowPlayingResponse {
  results: Movie[];
}

export interface Genre {
  id: number;
  name: string;
}
export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

// Country info for movie production
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

// Spoken language info for movie
export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}



//Review
export interface ReviewFace {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number | null;
  };
}
