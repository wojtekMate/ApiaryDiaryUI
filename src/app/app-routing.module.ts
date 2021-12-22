import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCanLoadGuard } from './services/auth/auth-can-load.guard';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./containers/login/login.module').then(m => m.LoginModule)},
  { path: 'register', loadChildren: () => import('./containers/register/register.module').then(m => m.RegisterModule)},
  { 
    path: 'apiary', 
    canLoad:[AuthCanLoadGuard], loadChildren: () => import('./containers/apiary/apiary.module').then(m => m.ApiaryModule),
    data: { expectedRole: ["admin", "user"] },
  },
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
