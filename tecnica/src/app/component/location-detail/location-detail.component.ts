import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {
  name!:string;
  type!:string;
  dimension!:string;
  created!:Date;
  resident!:string[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.name = this.data.name;
    this.created = this.data.created;
    this.dimension = this.data.dimension;
    this.type = this.data.type;
    this.resident = this.data.resident;
  }

}
