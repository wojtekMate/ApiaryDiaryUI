import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Hive } from '../../models/hive';
import { User } from '../../models/user';
import { HiveService } from '../../services/hive.service';

@Component({
  selector: 'app-add-hive-dialog',
  templateUrl: './add-hive-dialog.component.html',
  styleUrls: ['./add-hive-dialog.component.scss']
})
export class AddHiveDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddHiveDialogComponent>,
    private hiveService: HiveService
  ) { }
  
  races = [
    'Buckfast', 'Elgon', 'Carnica', 'Caucasica', 'Other'];
  hive: Hive;

  ngOnInit(): void {
    this.hive = new Hive();
  }

  save() {
    this.dialogRef.close();
    this.hiveService.addHive(this.hive);
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
