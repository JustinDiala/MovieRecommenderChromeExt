import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { switchMap } from 'rxjs/operators';
import { PopulateMoviesService } from 'src/app/services/populate-movies.service';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(public populateMoviesService: PopulateMoviesService) { 
this.populateMoviesService.populate().subscribe(async x=>{
  
})
  }
}
