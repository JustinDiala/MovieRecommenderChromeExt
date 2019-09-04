import { IGenres } from "./interfaces/genre.interface";
import { IMovies } from "./interfaces/movie.interface";

export async function fetchGenre(url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  });

  if (response.ok) {
    const json = await response.json();
    let myGenre: IGenres[] = [];

    myGenre = (json.genres as any[]).map(genre => {
      return { id: genre.id, name: genre.name };
    });

    return myGenre;
  }
}

export async function fetchMovie(url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  });

  if (response.ok) {
    const json = await response.json();
    let myMovie: IMovies[] = [];

    myMovie = (json.results as any[]).map(movie => {
      return {
        popularity: movie.popularity,
        vote_count: movie.vote_count,
        video: movie.video,
        poster_path: movie.poster_path,
        id: movie.id,
        adult: movie.adult,
        backdrop_path: movie.backdrop_path,
        original_language: movie.original_language,
        original_title: movie.original_language,
        genre_ids: movie.genre_ids,
        title: movie.title,
        vote_average: movie.vote_average,
        overview: movie.overview,
        release_date: movie.release_date
      };
    });

    return myMovie;
  }
}
