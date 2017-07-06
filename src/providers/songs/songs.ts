import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SongsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SongsProvider {

  constructor(public http: Http) {
    console.log('Hello SongsProvider Provider');
  }
  baseUrl: string= "https://briannassf-phortonssf.c9users.io:8080/api"
  path: string= "/Songs"
  
  addSong(newSong) {
    return this.http.post(
      this.baseUrl + this.path,
      newSong
    );
  }
  
  goToGeoPlaylist(token){
    return this.http.get(
        this.baseUrl + this.path + 
          '?access_token=' + token
          );
    }
}
