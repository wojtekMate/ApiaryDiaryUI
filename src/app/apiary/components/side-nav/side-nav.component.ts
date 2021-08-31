import { state } from '@angular/animations';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

const SMALL_WIDTH_BREAKPOINT =720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  showFiller = false;
  public isScreenSmall: boolean | undefined;
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver
        // .observe([Breakpoints.XSmall ])
        .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
        .subscribe((state: BreakpointState) => {
          this.isScreenSmall =state.matches;
        })
  }

}
