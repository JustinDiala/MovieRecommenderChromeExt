import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { YoutubeCategories } from "../interfaces/videoCategories.interface";
import { YoutubeVideos } from '../interfaces/myLikedVideos.interface';
import { IMovieGenres } from '../interfaces/genre.interface';
import { TheMovieDBService } from './the-movie-db.service';

declare var gapi: any;

var API_KEY: string = "AIzaSyBPo9Q7IWzkLgzZOvmhLVkjNphCW0qViIE";
var clientID: string =
  "464800061776-gdnvu5g16po1jhpvchapu94n4n63jkpa.apps.googleusercontent.com";
var SCOPES: string =
  "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  theMovieDBGenres$: BehaviorSubject<number[]> = new BehaviorSubject(null)

  constructor(public theMovieDBService: TheMovieDBService) {
    this.initClient();
  }

  initClient() {
    gapi.load("client", () => {
      console.log("loaded client");

      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: clientID,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
          ],
          scope: SCOPES
        })
        .then(() => {
          //

          gapi.client.load("youtube", "v3", () => {
            gapi.auth2
              .getAuthInstance()
              .signIn({
                scope: SCOPES
              })
              .then(
                () => {
                  console.log("Sign-in successful");

                  gapi.client.youtube.videoCategories
                    .list({
                      part: "snippet",
                      regionCode: "CA"
                    })
                    .then(
                      (
                        fetchedCategories: YoutubeCategories.CategoryFetched
                      ) => {
                        let ytCategories = fetchedCategories.result.items.map(
                          category => {
                            let x: YoutubeCategories.ICategory = {
                              categoryID: category.id,
                              categoryTitle: category.snippet.title
                            };

                            return x;
                          }
                        );


                        //console.log(ytCategories);


                        gapi.client.youtube.videos
                          .list({
                            part: "snippet",
                            myRating: "like",
                            maxResults: 50,
                          })
                          .then(
                            async (response: YoutubeVideos.IMyLikedVideosFetched) => {
                              // Handle the results here (response.result has the parsed body).

                              let movieGenres = await this.theMovieDBService.fetchGenre();

                              this.theMovieDBGenres$.next(
                                this.recommenderAlgorithm(ytCategories, response.result.items, await movieGenres.toPromise())
                              )
                            },
                            (err) => {
                              console.error("Execute error", err);
                            }
                          );
                      },
                      function (err) {
                        console.error("Execute error", err);
                      }
                    );
                },
                function (err) {
                  console.error("Error signing in", err);
                }
              );
          });
          //
        });
    });
  }


  getMovieDBGenres() {
    return this.theMovieDBGenres$.asObservable();
  }


  recommenderAlgorithm(ytCategories: YoutubeCategories.ICategory[], likedVideos: YoutubeVideos.Item[], movieGenres: IMovieGenres[]) {

    let categoriesMap = {
      "1": [16],
      "2": [28],
      "10": [10402],
      "15": [18],
      "17": [28, 53],
      // "18":[],
      "19": [12],
      "20": [878, 28],
      "21": [99],
      "22": [99],
      "23": [35],
      "24": [35, 18],
      "25": [99, 18],
      "26": [10749],
      "27": [99, 36],
      "28": [878],
      "30": [10770],
      "31": [16],
      "32": [28, 12],
      "33": [99],
      "34": [35],
      "35": [80, 36, 10752],
      "36": [10749, 18,],
      "37": [10751],
      "38": [],
      "39": [9648, 80, 27, 10752],
      "40": [878, 14],
      "41": [9648, 53, 10752],
      //"42":[],
      //"43":[],
      //"44":[],

    }

    //let truthArray:boolean[];
    let myLikedVideoCategories: string[] = [];
    let objectTruths = {};
    likedVideos.forEach(movie => {
      myLikedVideoCategories = [...myLikedVideoCategories, movie.snippet.categoryId];
      objectTruths[Number(movie.snippet.categoryId)] = true;
    });
    let categoriesTally = {}
    Object.keys(objectTruths).forEach(categoryID => {

      categoriesTally[Number(categoryID)] = myLikedVideoCategories.filter(myCategoryID =>
        myCategoryID === categoryID
      ).length

    })

    let youtubeCategoriesKeysSorted = Object.keys(categoriesTally).sort((a, b) => { return categoriesTally[b] - categoriesTally[a] })
    let theMovieDBCategories = youtubeCategoriesKeysSorted.map(youtubeCategoryID => {
      return categoriesMap[youtubeCategoryID]
    })
    const flattenedArray = [].concat(...theMovieDBCategories);
    let flattenedUniqueArray: number[] = [...new Set(flattenedArray)].filter(theMovieDBCategories => theMovieDBCategories)
    return flattenedUniqueArray;

  }
}
