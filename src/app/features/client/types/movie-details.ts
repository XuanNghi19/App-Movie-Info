export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country: string[]; // mới trong JSON này
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string; // ISO format (YYYY-MM-DD)
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TvDetails {
  adult: boolean;
  backdrop_path: string | null;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  first_air_date: string; // ISO (YYYY-MM-DD)
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string | null;
  last_episode_to_air: any | null; // chưa có dữ liệu, có thể khai cụ thể hơn nếu cần
  name: string;
  next_episode_to_air: NextEpisode | null;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: Season[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface Credits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number; 
  profile_path: string | null;
  cast_id?: number; // sometimes present
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export type KeywordResponse = {
  id: number;
  keywords: Keyword[];
  results: Keyword[];
};
export type Keyword = { name: string; id: number };

export type NextEpisode = {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
};

export interface ReviewAuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

export interface Review {
  author: string;
  author_details: ReviewAuthorDetails;
  content: string;
  created_at: string;   // ISO date string
  id: string;
  updated_at: string;   // ISO date string
  url: string;
}

export interface ReviewsResponse {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export interface VideoResult {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string; // e.g., 'YouTube'
  size: number; // e.g., 1080
  type: string; // e.g., 'Trailer', 'Featurette', 'Clip'
  official: boolean;
  published_at: string; // ISO date string
  id: string;
}

export interface VideoResponse {
  id: number;
  results: VideoResult[];
}

export interface MediaImage {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface MediaImagesResponse {
  id: number;
  backdrops: MediaImage[];
  logos: MediaImage[];
  posters: MediaImage[];
}

export interface RecommendationResponse {
  page: number;
  results: Recommendation[];
  total_pages: number;
  total_results: number;
}

export interface Recommendation {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title?: string; // Movie
  name?: string; // TV show
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  media_type: 'movie' | 'tv';
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string; // Movie
  first_air_date?: string; // TV show
  video?: boolean;
  vote_average: number;
  vote_count: number;
}
