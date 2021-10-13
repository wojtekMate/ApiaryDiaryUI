import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./containers/login/login.module').then(m => m.LoginModule)},
  { path: 'apiary', loadChildren: () => import('./containers/apiary/apiary.module').then(m => m.ApiaryModule) },
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
