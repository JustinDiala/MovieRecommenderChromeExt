"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const app = express_1.default();
const port = 8080; // default port to listen
function fetchGenre(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield node_fetch_1.default(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        if (response.ok) {
            const json = yield response.json();
            let myGenre = [];
            myGenre = json.genres.map((genre) => {
                return { id: genre.id, name: genre.name };
            });
            return myGenre;
        }
    });
}
function fetchMovie(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield node_fetch_1.default(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });
        if (response.ok) {
            const json = yield response.json();
            let myMovie = [];
            myMovie = json.results.map((movie) => {
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
    });
}
// define a route handler for the default home page
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //  fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=b7ef60376b50d5774e2b4318bd6e2c45&language=en-US").then(
    //      (data) => {
    //        console.log(data);
    //        res.send("Success");
    //     }
    //  ).catch((err) => {
    //      console.log(err);
    //  });
    const ourGenres = yield fetchGenre("https://api.themoviedb.org/3/genre/movie/list?api_key=b7ef60376b50d5774e2b4318bd6e2c45&language=en-US");
    const ourMovies = yield fetchMovie("https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=b7ef60376b50d5774e2b4318bd6e2c45&language=en-US");
    res.send(ourMovies);
    /// discover/movie?with_genres=18
}));
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map