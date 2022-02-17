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
import { AddHiveDialogComponent } from './components/add-hive-dialog/add-hive-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenu } from '@angular/material/menu';
import { HiveService } from './services/hive.service';
import { SummaryComponent } from './components/summary/summary.component';
import { BrowserModule } from '@angular/platform-browser';

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
    BeesComponent,
    AddHiveDialogComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UserService,
    HiveService
  ]
})
export class ApiaryModule { }
