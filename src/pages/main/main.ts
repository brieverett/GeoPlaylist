import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SongsProvider } from '../../providers/songs/songs';
import { TabsPage } from './../tabs/tabs';
import { LandingPage } from './../landing/landing';
import { AppUsersProvider } from '../../providers/app-users/app-users';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

declare var google;

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
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public Songs: SongsProvider,
  private googleMaps: GoogleMaps,
  public appUsers: AppUsersProvider) {
    
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
    this.loadMap();
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
  
  //LEARN 32.709553,-117.157958  , don't forget importing here and in the module, also the ionic plugin
  loadMap(){
  
    let latLng = new google.maps.LatLng(32.709553,-117.157958);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

  // josh morony to implement geolocation centers
/*    loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }, (err) => {
      console.log(err);
    });
 
  }
  
  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
    let content = "<h4>Information!</h4>";          
   
    this.addInfoWindow(marker, content);
 
  }*/

  logout(){
      this.appUsers.logout(window.localStorage.getItem("token"))
    .map(res => res.json())
    .subscribe(res => {
      console.log("res", res);
      }, error => {
        alert("Logout Error");
    });
      this.navCtrl.setRoot(LandingPage);
    }
  
}

