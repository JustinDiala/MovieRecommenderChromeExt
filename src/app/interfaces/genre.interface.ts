export type GenreNameTypings =
  | "Action"
  | "Adventure"
  | "Animation"
  | "Comedy"
  | "Crime"
  | "Documentary"
  | "Drama"
  | "Family"
  | "Fantasy"
  | "History"
  | "Horror"
  | "Music"
  | "Mystery"
  | "Romance"
  | "Science Fiction"
  | "TV Movie"
  | "Thriller"
  | "War"
  | "Western";

export interface IMovieGenres {
  id: number;
  name: GenreNameTypings;
}

export interface IFetchedMovieGenresTypings {
  genres: IMovieGenres[];
}
