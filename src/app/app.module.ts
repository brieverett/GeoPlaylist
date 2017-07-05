import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { LandingPage } from '../pages/landing/landing';
import { MainPage } from '../pages/main/main';
import { UserPage } from '../pages/user/user';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppUsersProvider } from '../providers/app-users/app-users';
import { PlaylistProvider } from '../providers/playlist/playlist';
import { SongsProvider } from '../providers/songs/songs';

let injections: any[]=[
    MyApp,
    LandingPage,
    MainPage,
    UserPage,
    SettingsPage,
    TabsPage,
    RegisterPage,
    LoginPage
  ]
  
@NgModule({
  declarations: injections,
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: injections,
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppUsersProvider,
    PlaylistProvider,
    SongsProvider
  ]
})
export class AppModule {}
