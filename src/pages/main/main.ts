import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SongsProvider } from '../../providers/songs/songs';
import { TabsPage } from './../tabs/tabs'

/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  songInfo: any = {};
  GeoPlaylist: any;
  
  
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public Songs: SongsProvider) {
    
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
        alert("Warning Will Robinson!");
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

    songForm(form) { 
      if(form.invalid) {
      return alert("nope, no song");
      }
    console.log("songInfo", this.songInfo)
    this.Songs.addSong(this.songInfo)
    .map(res => res.json())
    .subscribe(res => {
      // handle successful responses and decide what happens next
      window.localStorage.setItem('token', res.token);
      window.localStorage.setItem('id', res.id);
      this.navCtrl.setRoot(TabsPage);
    }, error => {
       alert("Please try again.");
      }
      // inform the user of any known problems that arose, otherwise give a generic
      // failed message
      //  if(error ) then 404: not found
      // 422: email is already taken
      // (response.data === null): user is offline
      // 500: the world has ended, or the server just isn’t online.

    );

  }
  

}