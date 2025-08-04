export interface PersonDetail {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
}
export interface CombinedCredits {
  id: number;
  cast: CreditItem[];
  crew: CreditItem[];
}

export interface CreditItem {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;

  episode_count: number;
  media_type: 'movie' | 'tv';

  // Cast-specific fields
  character?: string;
  order?: number;

  // Crew-specific fields
  department?: string;
  job?: string;

  credit_id: string;
}
export interface DisplayItem {
  id: number;
  title: string | undefined;
  poster_path: string | null;
  media_type: 'movie' | 'tv';
  character?: string;
  release_date?: string;
  first_air_date?: string;
  episode_count?: number;
}
