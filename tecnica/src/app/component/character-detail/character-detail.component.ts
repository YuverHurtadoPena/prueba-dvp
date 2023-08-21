import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  image:string = "";
  name:string = "";
  status:string = "";
  species:string = "";
  gender:string = "";
  created!: Date;
  location = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    console.log(this.data)
    this.image = this.data.image;
    this.name = this.data.name;
    this.status = this.data.status;
    this.species = this.data.species;
    this.gender = this.data.gender;
    this.created = this.data.created;
    this.location = this.data.location;
  }

}
