"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const app = express_1.default();
const port = 8080; // default port to listen
app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const allGenres = yield utils_1.fetchGenre("https://api.themoviedb.org/3/genre/movie/list?api_key=b7ef60376b50d5774e2b4318bd6e2c45&language=en-US");
    const recommendedMovies = yield utils_1.fetchMovie("https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=b7ef60376b50d5774e2b4318bd6e2c45&language=en-US");
    res.send([allGenres, recommendedMovies]);
}));
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map