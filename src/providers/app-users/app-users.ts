import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { RegisterPage } from '../../pages/register/register';
import { LoginPage } from '../../pages/login/login';
/*
  Generated class for the AppUsersProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppUsersProvider {

  constructor(public http: Http) {
    console.log('Hello AppUsersProvider Provider');
  }
  
  baseUrl: string= "https://briannassf-phortonssf.c9users.io:8080/api"
  path: string= "/AppUsers"

  register(newUserData) {
    return this.http.post(
      this.baseUrl + this.path,
      newUserData
    );
  }

  login(userData) {
    return this.http.post(
      this.baseUrl + this.path + "/login",
      userData
    );
  }
  
 logout(token){
    return this.http.post(
      this.baseUrl + this.path + '/logout' + 
        '?access_token=' + token,
        {}
      );
  }
  
/*  getUser(token){
    return this.http.get(
        this.baseUrl + this.path + 
          '?access_token=' + token
          );
  }*/
  
}