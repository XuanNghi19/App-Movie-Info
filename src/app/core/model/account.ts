export interface ShowsState{
  id: number,
  favorite: boolean,
  rated: boolean,
  watchlist: boolean
}

export interface FavoriteRequets {
  media_type: string,
  media_id: number,
  favorite: boolean
};

export interface WatchlistRequets {
  media_type: string,
  media_id: number,
  watchlist: boolean
};

export interface PostResponse{
  success: boolean,
  status_code: number,
  status_message: string
}