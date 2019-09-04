import express from "express";
import { fetchGenre, fetchMovie } from "./utils";

const app = express();
const port = 8080; // default port to listen

app.get("/", async (req, res) => {
  const allGenres = await fetchGenre(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=b7ef60376b50d5774e2b4318bd6e2c45&language=en-US"
  );

  const recommendedMovies = await fetchMovie(
    "https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=b7ef60376b50d5774e2b4318bd6e2c45&language=en-US"
  );

  res.send([allGenres, recommendedMovies]);
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
