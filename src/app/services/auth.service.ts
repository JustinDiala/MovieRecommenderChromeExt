import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";

declare var gapi: any;

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    // this.initClient();
    // this.user$ = afAuth.authState;
  }

  initClient() {
    gapi.load("client", () => {
      console.log("loaded client");

      // It's OK to expose these credentials, they are client safe.
      gapi.client.init({
        apiKey: "AIzaSyBfdDQ-a4JI3FTytkLFGPZShhP7M7OToak",
        clientId:
          "126603917020-qm7jkjqie5vhkug1t4pj38camrrftppj.apps.googleusercontent.com",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
        ],
        scope: "https://www.googleapis.com/auth/youtube.readonly"
      });

      gapi.client.load("youtube", "v3", () => console.log("loaded youtube"));
    });
  }
}
