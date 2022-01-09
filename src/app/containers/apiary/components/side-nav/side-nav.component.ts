import { state } from '@angular/animations';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

const SMALL_WIDTH_BREAKPOINT =720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  showFiller = false;
  public isScreenSmall: boolean | undefined;
  users: Observable<User[]> | undefined;
  user: any | undefined;
  constructor(
    private breakpointObserver: BreakpointObserver, 
    private userService: UserService) { }

  ngOnInit(): void {
    this.breakpointObserver
        // .observe([Breakpoints.XSmall ])
        .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
        .subscribe((state: BreakpointState) => {
          this.isScreenSmall =state.matches;
        })
        this.user = this.userService.getUser().subscribe((user) => {
        this.user = user;
        console.log(user);
    });

        //this.users = this.userService.users;
        //this.userService.loadAll(); //load collection

        //this.users.subscribe(data => {
        //  console.log(data)
        //})


  }

}
