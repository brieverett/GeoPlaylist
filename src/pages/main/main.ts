import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 
declare var google;

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage{
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
 
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public geolocation: Geolocation) {
    
    
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }

// B - josh morony map, works
 loadMap(){
 
    let latLng = new google.maps.LatLng(32.709553,-117.157958);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
  }
}


// B - josh morony add marker, not necessary
/*MainPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  
  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    this.loadMap();
  }
  
   loadMap(){
    
    this.geolocation.getCurrentPosition().then((position) => {
 
    //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 

      let latLng = new google.maps.LatLng(32.709553,-117.157958);
 
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
     
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
     }
   }*/
  
/*  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      //position: this.map.getCenter()
      position: new google.maps.LatLng(32.709553,-117.157958)
    });
   
    let content = "<h4>Information!</h4>";          
   
    this.addInfoWindow(marker, content);
 
  }
  
  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
  });
 
  }*/

