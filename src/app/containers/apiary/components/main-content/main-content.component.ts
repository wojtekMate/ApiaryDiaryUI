import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Hive } from '../../models/hive';
import { User } from '../../models/user';
import { HiveService } from '../../services/hive.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  hives: Observable<Hive[]>;
  constructor(private route: ActivatedRoute, private hiveService: HiveService) { }

  ngOnInit(): void {
   this.hiveService.getAll();
   this.hives = this.hiveService.hives;
  }
}
