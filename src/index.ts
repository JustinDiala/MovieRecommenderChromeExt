import express from "express";
import fetch from "node-fetch";
import { IGenres } from "./interfaces/genre.interface";
import { fetchGenre, fetchMovie } from "./utils";
import { IMovies } from "./interfaces/movie.interface";
const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/", async (req, res) => {
  const ourGenres: IGenres[] = await fetchGenre(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=b7ef60376b50d5774e2b4318bd6e2c45&language=en-US"
  );

  const ourMovies: IMovies[] = await fetchMovie(
    "https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=b7ef60376b50d5774e2b4318bd6e2c45&language=en-US"
  );

  res.send(ourMovies);
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
