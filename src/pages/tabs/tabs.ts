import { Component } from '@angular/core';

import { MainPage } from '../main/main';
import { SettingsPage } from '../settings/settings';
import { UserPage } from '../user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MainPage; 
  tab2Root = SettingsPage;
  tab3Root = UserPage;

  constructor() {

  }
}
