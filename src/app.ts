import bodyParser from "body-parser";
import express from "express";

import { fetchGenre, fetchMovie } from "./utils";
import { IMovieGenres } from "./interfaces/genre.interface";
import { IMovie } from "./interfaces/movie.interface";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// App routes (endpoints)

app.get("/", async (req, res) => {
  const allGenres: IMovieGenres[] = await fetchGenre(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=b7ef60376b50d5774e2b4318bd6e2c45&language=en-US"
  );

  const recommendedMovies: IMovie[] = await fetchMovie(
    "https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=b7ef60376b50d5774e2b4318bd6e2c45&language=en-US"
  );

  res.send([allGenres, recommendedMovies]);
});

export default app;
