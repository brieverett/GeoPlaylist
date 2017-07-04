import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivePage } from './active';

@NgModule({
  declarations: [
    ActivePage,
  ],
  imports: [
    IonicPageModule.forChild(ActivePage),
  ],
  exports: [
    ActivePage
  ]
})
export class ActivePageModule {}
