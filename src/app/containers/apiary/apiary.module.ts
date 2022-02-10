import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiaryAppComponent } from './apiary-app.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserService } from './services/user.service';
import { AccountComponent } from './components/account/account.component';
import { HoneyComponent } from './components/honey/honey.component';
import { BeesComponent } from './components/bees/bees.component';

const routes: Routes = [
  {
    path: '', component: ApiaryAppComponent,
    children: [
      { path: 'account',component: AccountComponent},
      { path: 'honey',component: HoneyComponent},
      { path: 'bees',component: BeesComponent},
      { path: ':id', component: MainContentComponent },
      { path: '', component: MainContentComponent}
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    ApiaryAppComponent,
    SideNavComponent,
    MainContentComponent,
    ToolbarComponent,
    AccountComponent,
    HoneyComponent,
    BeesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UserService
  ]
})
export class ApiaryModule { }
