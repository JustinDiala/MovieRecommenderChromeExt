import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { TheMovieDBService } from './the-movie-db.service';
import { switchMap, map } from 'rxjs/operators';
import { from, of, Observable } from 'rxjs';
import { IMovie } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class PopulateMoviesService {

  constructor(private authService: AuthService, private theMovieDBService:TheMovieDBService) {

   
   }

   populate(){
   return this.authService.getMovieDBGenres().pipe(
      switchMap(genres=>{

   if(genres.length){
    let x= from(genres.map( genre=>
      this.theMovieDBService.fetchMovie(genre)
       ))

   }else{
     return of(null)
   }
      })
    )
   }
}
