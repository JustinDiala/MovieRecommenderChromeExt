import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  IMovieGenres,
  IFetchedMovieGenresTypings
} from "../interfaces/genre.interface";

import { map, shareReplay, share } from "rxjs/operators";
import { IFetchedMoviesTypings } from "../interfaces/movie.interface";

@Injectable({
  providedIn: "root"
})
export class TheMovieDBService {
  constructor(private http: HttpClient) {}

  async fetchGenre() {
    let genreURL: string =
      "https://api.themoviedb.org/3/genre/movie/list?api_key=b7ef60376b50d5774e2b4318bd6e2c45&language=en-US";

    return this.http.get<IFetchedMovieGenresTypings>(genreURL).pipe(
      map(fetchedGenresObject => fetchedGenresObject.genres),
      share()
    );
  }

  async fetchMovie() {
    let sampleMovieURL: string =
      "https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=b7ef60376b50d5774e2b4318bd6e2c45&language=en-US";

    return this.http.get<IFetchedMoviesTypings>(sampleMovieURL).pipe(
      map(fetchedGenresObject => fetchedGenresObject.results),
      share()
    );
  }
}
