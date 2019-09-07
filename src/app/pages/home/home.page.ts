import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService
      .loadClient()
      .then(
        result => {
          console.log("Api loaded");
          return this.authService.initClient();
        },
        err => {
          console.log("api failed");
        }
      )
      .then(
        result => {
          console.log("api ready");
        },
        err => {
          console.log("api not ready");
        }
      );
  }
}
