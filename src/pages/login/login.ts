import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppUsersProvider } from '../../providers/app-users/app-users';
import { TabsPage } from './../tabs/tabs'

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: any = {}
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  public appUsers: AppUsersProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

    signupForm(form) { 
      if(form.invalid) {
      return alert("Please fill in all of the required fields.");
      }
    this.appUsers.login(this.user)
    .map(res => res.json())
    .subscribe(res => {
      console.log(res);
      // handle successful responses and decide what happens next
      window.localStorage.setItem('token', res.id);
      window.localStorage.setItem('userId', res.userid);
      this.navCtrl.setRoot(TabsPage);
    }, error => {
       alert("Please login again.");
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
