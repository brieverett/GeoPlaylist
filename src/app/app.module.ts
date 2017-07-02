import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LandingPage } from '../pages/landing/landing';
import { MainPage } from '../pages/main/main';
import { UserPage } from '../pages/user/user';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tab s';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

let injections: any[]=[
    MyApp,
    LandingPage,
    MainPage,
    UserPage,
    SettingsPage,
    TabsPage
  ]
  
@NgModule({
  declarations: injections,
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: injections,
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
