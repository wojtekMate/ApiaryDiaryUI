import { AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Hive } from '../../models/hive';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, AfterViewInit,DoCheck {
  
  @Input() hives: Observable<Hive[]>;
  displayedColumns: string[] = ['position', 'title', 'date' ];
  dataSource: MatTableDataSource<Hive>;
  constructor() { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngDoCheck(): void {
    this.hives.subscribe(data =>{this.dataSource = new MatTableDataSource<Hive>(data)})
  }
  ngOnInit(): void {
    this.hives.subscribe(data =>{this.dataSource = new MatTableDataSource<Hive>(data)})
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
