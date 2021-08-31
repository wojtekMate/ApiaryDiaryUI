import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'apiary', loadChildren: () => import('./apiary/apiary.module').then(m => m.ApiaryModule) },
  { path: '**', redirectTo: 'apiary' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
