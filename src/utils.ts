import fetch from "node-fetch";

import {
  IFetchedMovieGenresTypings,
  IMovieGenres
} from "./interfaces/genre.interface";
import { IFetchedMoviesTypings, IMovie } from "./interfaces/movie.interface";

export async function fetchGenre(url: string): Promise<IMovieGenres[]> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      const fetchedGenresObject = (await response.json()) as IFetchedMovieGenresTypings;

      return fetchedGenresObject.genres;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMovie(url: string): Promise<IMovie[]> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      const fetchedMoviesObject = (await response.json()) as IFetchedMoviesTypings;
      return fetchedMoviesObject.results;
    }
  } catch (error) {
    console.error(error);
  }
}
