import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-episodes-detail',
  templateUrl: './episodes-detail.component.html',
  styleUrls: ['./episodes-detail.component.css']
})
export class EpisodesDetailComponent implements OnInit {
  name:string = "";
  air_date:string = "";
  id:number = 0;
  episode: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.name = this.data.name;
    this.air_date =  this.data.air_date;
    this.episode = this.data.episode;
    this.id = this.data.id;
  }

}
