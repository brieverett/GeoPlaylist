import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Geofence } from '@ionic-native/geofence';
import { ActivePage } from '../active/active';

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
  radius: number = 500;
  fenceerror: any;
  success:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private geofence: Geofence, private platform: Platform) {
    this.platform.ready().then(() => {
         
      this.geofence.initialize().then(
        () => console.log('Geofence Plugin Ready'),
        (err) => console.log(err)
      );
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  watch() {
     this.geolocation.getCurrentPosition().then((resp) => {
      this.coords = resp.coords.latitude + ' ' + resp.coords.longitude;
      this.accuracy = resp.coords.accuracy + ' meters';
    }).catch((error) => {
      this.error = 'Error getting location: ' + error;
    });
  }

  setGeofence(value: number) {

    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true
    }).then((resp) => {
      var longitude = resp.coords.longitude;
      var latitude = resp.coords.latitude;
      var radius = value;

      let fence = {
          id: "myGeofenceID1", 
          latitude:       latitude, 
          longitude:      longitude,
          radius:         radius,  
          transitionType: 2
        }
      
        this.geofence.addOrUpdate(fence).then(
          () => this.success = true,
          (err) => this.error = "Failed to add or update the fence."
        );

        this.geofence.onTransitionReceived().subscribe(resp => {
          //SMS.send('5555555555', 'OMG She lied, leave her now!');
          console.log("entered geofence");
        });

        this.navCtrl.push(ActivePage);


    }).catch((error) => {
      this.error = error;
    });
  }



}
