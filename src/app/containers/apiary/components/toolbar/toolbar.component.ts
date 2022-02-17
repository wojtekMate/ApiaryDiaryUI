import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddHiveDialogComponent } from '../add-hive-dialog/add-hive-dialog.component';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav : EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
  }

  openAddHiveDialog() : void
  {
    let dialogRef = this.dialog.open(AddHiveDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result)

      if (result) {
        this.toastr.success("Contact added").onAction.subscribe(() => {
          this.router.navigate(['/apiary/bees', result.id]);
        });
      }
    })
  }
}
