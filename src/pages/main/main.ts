import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Geofence } from '@ionic-native/geofence';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';


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

  coords: any;
  accuracy: any;
  error: any;
  //B - ???
  fence: any;

      
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private geofence: Geofence, private googleMaps: GoogleMaps) {
    geofence.initialize().then(
        // resolved promise does not return a value
        () => console.log('Geofence Plugin Ready'),
        (err) => console.log(err)
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }
  
  // B- Geoloaction, returns current coordinants
  // B- not necessary, delete?
  watch() {
     this.geolocation.getCurrentPosition().then((resp) => {
      this.coords = resp.coords.latitude + ' ' + resp.coords.longitude;
      this.accuracy = resp.coords.accuracy + ' meters';
    }).catch((error) => {
      this.error = 'Error getting location: ' + error;
    });
  }
  
  // B - Geofencing around the LEARN academy. Geofencing is static, will not change in app.
  // B - copied from ionic documentation
  private addGeofence() {
    //options describing geofence
    let fence = {
      id: '69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb', //any unique ID
      //B - LEARN's coordinants
      lat:      32.709553,  //center of geofence radius
      long:      -117.157958,
      radius:         500, //radius to edge of geofence in meters
      transitionType: 3, //see 'Transition Types' below
      notification: { //notification settings
          id:             1, //any unique ID
          title:          'You crossed a fence', //notification title
          text:           'Welcom to the Downtown San Diego GeoPlaylist', //notification body
          openAppOnClick: true //open app when notification is tapped
      }
    }
  
    this.geofence.addOrUpdate(fence).then(
       () => console.log('Geofence added'),
       (err) => console.log('Geofence failed to add')
     );
  }
  
  // B- google maps!!! copied from ionic docs
  // B- trying to display the map with existing geofence. 
  // B- TODO: get geofences from new geofence provider
  
  ngAfterViewInit() {
     this.loadMap();
    }
    
  loadMap() {
      let element: HTMLElement = document.getElementById('map');
    
     let map: GoogleMap = this.googleMaps.create(element);
    
     // listen to MAP_READY event
     // You must wait for this event to fire before adding something to the map or modifying it in anyway
     map.one(GoogleMapsEvent.MAP_READY).then(
       () => {
         console.log('Map is ready!');
         // Now you can add elements to the map like the marker
        // B - this code copied from google API
        map.addCircle(new CircleOptions()
           .center(new LatLng(32.709553,-117.157958))
           .radius(100)
           .strokeColor(Color.RED)
           .fillColor(Color.BLUE));
         //B - the following addcircle code is awg , A Wild Guess
        /*addCircle({
          center: ( 32.709553,-117.157958),
          map: this.map,
          radius: 500,
          strokeColor: "red",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "red",
          clickable: false,
        })*/
       }
     );
    
     // create LatLng object
     let ionic: LatLng = new LatLng(32.709553,-117.157958);
    
     // create CameraPosition
     let position: CameraPosition = {
       target: ionic,
       zoom: 18,
       tilt: 30
     };
    
     // move the map's camera to position
     map.moveCamera(position);
    
     // create new marker
     let markerOptions: MarkerOptions = {
       position: ionic,
       title: 'Ionic'
     };
    
     const marker: Marker = map.addMarker(markerOptions)
       .then((marker: Marker) => {
          marker.showInfoWindow();
        });
     }
    
    }