import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";

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
    this.initClient();
    this.user$ = afAuth.authState;
    //this.fetchChannelID();
  }

  initClient() {
    gapi.load("client", () => {
      console.log("loaded client");

      gapi.client.setApiKey(API_KEY);

      // It's OK to expose these credentials, they are client safe.
      gapi.client.init({
        apiKey: API_KEY,
        clientId: clientID,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
        ],
        scope: SCOPES
      });

      //
      //"464800061776-gdnvu5g16po1jhpvchapu94n4n63jkpa.apps.googleusercontent.com",
      gapi.auth.authorize(
        {
          client_id: clientID,
          scope: SCOPES,
          immediate: false
        },
        function(authResult) {
          if (authResult && !authResult.error) {
            alert("Auth success");
            gapi.client.load("youtube", "v3", () => {
              gapi.auth2
                .getAuthInstance()
                .signIn({
                  scope: "https://www.googleapis.com/auth/youtube.readonly"
                })
                .then(
                  function() {
                    console.log("Sign-in successful");
                    gapi.client.youtube.channels
                      .list({
                        part: "snippet,contentDetails,statistics",
                        //categoryId: "UCU1y1NaQWVKrnAuoaJs5NLw",
                        mine: true
                      })
                      .then(
                        function(response) {
                          console.log("Response", response);
                        },
                        function(err) {
                          console.log("Error in execution", err);
                        }
                      );
                  },
                  function(err) {
                    console.error("Error signing in", err);
                  }
                );
              gapi.client
                .load(
                  "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
                )
                .then(
                  function() {
                    console.log("GAPI client loaded for API");
                  },
                  function(err) {
                    console.error("Error loading GAPI client for API", err);
                  }
                );
            });
          } else {
            alert("auth fail");
          }
        }
      );
    });
  }

  //   authenticate() {
  //     return gapi.auth2.getAuthInstance()
  //         .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
  //         .then(function() { console.log("Sign-in successful"); },
  //               function(err) { console.error("Error signing in", err); });
  //   }

  //  loadClient() {
  //     gapi.client.setApiKey("AIzaSyBfdDQ-a4JI3FTytkLFGPZShhP7M7OToak");
  //     return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
  //         .then(function() { console.log("GAPI client loaded for API"); },
  //               function(err) { console.error("Error loading GAPI client for API", err); });
  //   }

  // function execute() {
  //   return gapi.client.youtube.playlists.list({
  //     "part": "snippet,contentDetails",
  //     "maxResults": 25,
  //     "mine": true
  //   })
  //       .then(function(response) {
  //               // Handle the results here (response.result has the parsed body).
  //               console.log("Response", response);
  //             },
  //             function(err) { console.error("Execute error", err); });
  // }

  // return gapi.client.youtube.channels.list({
  //   "part": "snippet,contentDetails,statistics",
  //   "mine": true
  // })
  //     .then(function(response) {
  //             // Handle the results here (response.result has the parsed body).
  //             console.log("Response", response);
  //           },
  //           function(err) { console.error("Execute error", err); });

  // fetchChannelID() {

  //   return gapi.client.youtube.channels.list({
  //     "part": "snippet,contentDetails,statistics",
  //     "mine": true
  //   }).then(function(response) {

  //     console.log("Response", response);

  //   },
  //   function(err) {
  //     console.log("Error in execution", err);
  //   });

  // }
}
