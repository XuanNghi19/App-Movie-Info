export interface Response<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TrendingMovie {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  media_type: 'movie';
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TrendingPerson {
  adult: boolean;
  gender: number;
  id: number;
  known_for: KnownForMedia[];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string | null;
  media_type: 'person';
}

export interface KnownForMedia {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title?: string; // Nếu là movie
  name?: string; // Nếu là TV show
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  media_type: 'movie' | 'tv';
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  first_air_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TVShow {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  origin_country: string[]; // e.g. ["US"]
  original_language: string; // e.g. "en"
  original_name: string; // e.g. "Original Title"
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string; // e.g. "2023-09-01"
  name: string; // e.g. "Show Title"
  vote_average: number;
  vote_count: number;
}

export interface UpcomingResponse<T> {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface UpcomingMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string; // dùng để tạo URL YouTube: https://www.youtube.com/watch?v=key
  site: string; // ví dụ: "YouTube", "Vimeo"
  size: number; // độ phân giải video, ví dụ: 720, 1080
  type: string; // ví dụ: "Trailer", "Teaser", "Clip", v.v.
  official: boolean;
  published_at: string; // ISO date string
  id: string; // id của video trong hệ thống TMDB
}

export interface MovieVideosResponse {
  id: number; // ID của movie
  results: MovieVideo[];
}

export interface LeaderboardUser {
  username: string;
  avatarUrl?: string;
  allTimeEdits: number;
  weeklyEdits: number;
}