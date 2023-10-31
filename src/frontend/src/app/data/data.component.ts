import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  data: any;
  everything: boolean = false;
  
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getData();

    interval(15000).subscribe(() => {
      this.getData();
    });
  }

  getData(): void {
    this.dataService.getData().subscribe((response) => {
      this.data = response;
    });
  }
}
