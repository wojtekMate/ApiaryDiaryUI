import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { HivesListComponent } from './apiary/hives-list/hives-list.component';

const APP_ROUTES : Route[]  = [
  { path: '', pathMatch: 'full', redirectTo: 'apiary' },
  { path: 'apiary', component: <any>HivesListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
