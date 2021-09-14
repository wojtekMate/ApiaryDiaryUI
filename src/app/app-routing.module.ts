import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'apiary', loadChildren: () => import('./apiary/apiary.module').then(m => m.ApiaryModule) },
  { path: '**', redirectTo: 'apiary' }
];


const routes: Routes = [
  { path: 'contactmanager', loadChildren: () => import('./contactmanager/contactmanager.module').then(m => m.ContactmanagerModule) },
  { path: 'demo', loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule) },
  { path: '**', redirectTo: 'contactmanager' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
