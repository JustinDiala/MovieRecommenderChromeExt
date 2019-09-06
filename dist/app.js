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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
// Create Express server
const app = express_1.default();
// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// App routes (endpoints)
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allGenres = yield utils_1.fetchGenre("https://api.themoviedb.org/3/genre/movie/list?api_key=b7ef60376b50d5774e2b4318bd6e2c45&language=en-US");
    const recommendedMovies = yield utils_1.fetchMovie("https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=b7ef60376b50d5774e2b4318bd6e2c45&language=en-US");
    res.send([allGenres, recommendedMovies]);
}));
exports.default = app;
//# sourceMappingURL=app.js.map