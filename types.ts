
export interface Movie {
  id: string;
  title: string;
  year: string;
  posterUrl: string;
  plot: string;
  director: string;
  actors: string[];
  genre: string[];
}

export interface Review {
  id: string;
  movieId: string;
  username: string;
  comment: string;
  timestamp: number;
}

export interface Rating {
  movieId: string;
  score: number; // 1-5
}
