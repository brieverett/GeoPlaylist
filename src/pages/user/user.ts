
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AppUsersProvider } from '../../providers/app-users/app-users';
import { SongsProvider } from '../../providers/songs/songs';
import { TabsPage } from './../tabs/tabs'
import { LandingPage } from './../landing/landing'

/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  GeoPlaylist: any;
  //currentUser: any;

  
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public Songs: SongsProvider,
  /*public appUsers: AppUsersProvider*/) {

/*   this.appUsers.getUser(window.localStorage.getItem("token"))
    .map(res => res.json())
    .subscribe(res => {
      console.log("res", res);
      this.currentUser = res;
      console.log("User",this.currentUser)
      /*for(let singleQuestion of apiQuestions){
        if(!this.questions[singleQuestion.Question_Number - 1]){
        this.questions[singleQuestion.Question_Number - 1] = {};
        }
        this.questions[singleQuestion.Question_Number - 1][singleQuestion.Answer_ID]=singleQuestion;
      }
      }, error => {
        alert("Warning User!");
    });*/
    
    this.Songs.goToGeoPlaylist(window.localStorage.getItem("token"))
    .map(res => res.json())
    .subscribe(res => {
      console.log("res", res);
      this.GeoPlaylist = res;
      console.log("GeoPlaylist",this.GeoPlaylist)
      /*for(let singleQuestion of apiQuestions){
        if(!this.questions[singleQuestion.Question_Number - 1]){
        this.questions[singleQuestion.Question_Number - 1] = {};
        }
        this.questions[singleQuestion.Question_Number - 1][singleQuestion.Answer_ID]=singleQuestion;
      }*/
      }, error => {
        alert("Warning User Playlist!");
    });
    
  }

    
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }
  
    logout(){
       this.navCtrl.setRoot(LandingPage);
  }
}