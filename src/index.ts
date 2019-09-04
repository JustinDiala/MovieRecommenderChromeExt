import express from "express";
import fetch from "node-fetch";
const app = express();
const port = 8080; // default port to listen

interface IGenres {
    id: number;
    name: string;
}

interface IMovies {

    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path: string;
    id: number;
    adult: boolean;
    backdrop_path: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;

}

async function fetchGenre(url: string) {

    const response = await fetch(url, {

        method: "GET",
        headers: {
            Accept: "application/json",
        },
    },
    );

    if (response.ok) {
        const json = await response.json();
        let myGenre: IGenres[] = [];

        myGenre = (json.genres as any[]).map((genre) => {
            return { id: genre.id, name: genre.name };
        }
        );

        return myGenre;

    }

}

async function fetchMovie(url: string) {

    const response = await fetch(url, {

        method: "GET",
        headers: {
            Accept: "application/json",
        },
    },
    );

    if (response.ok) {
        const json = await response.json();
        let myMovie: IMovies[] = [];

        myMovie = (json.results as any[]).map((movie) => {

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
        }
        );

        return myMovie;

    }

}

// define a route handler for the default home page
app.get("/", async (req, res) => {

    //  fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=b7ef60376b50d5774e2b4318bd6e2c45&language=en-US").then(
    //      (data) => {
    //        console.log(data);
    //        res.send("Success");
    //     }
    //  ).catch((err) => {
    //      console.log(err);
    //  });

    const ourGenres: IGenres[] = await fetchGenre("https://api.themoviedb.org/3/genre/movie/list?api_key=b7ef60376b50d5774e2b4318bd6e2c45&language=en-US");

    const ourMovies: IMovies[] = await fetchMovie("https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=b7ef60376b50d5774e2b4318bd6e2c45&language=en-US");

    res.send(ourMovies);
    /// discover/movie?with_genres=18

});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
