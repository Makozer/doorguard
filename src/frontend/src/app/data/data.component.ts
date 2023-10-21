import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  data: any;
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((response) => {
      this.data = response;
    });
  }
}
