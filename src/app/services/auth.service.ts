import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";

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
                        console.log("Error in fetching playlist", err);
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
