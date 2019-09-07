import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { YoutubeCategories } from "../interfaces/videoCategories.interface";

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
  user$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    // this.initClient();
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
                        console.log(ytCategories);

                        gapi.client.youtube.videos
                          .list({
                            part: "snippet",
                            myRating: "like"
                          })
                          .then(
                            function(response) {
                              // Handle the results here (response.result has the parsed body).
                              console.log(response);
                            },
                            function(err) {
                              console.error("Execute error", err);
                            }
                          );
                      },
                      function(err) {
                        console.error("Execute error", err);
                      }
                    );
                },
                function(err) {
                  console.error("Error signing in", err);
                }
              );
          });
          //
        });
    });
  }
}
