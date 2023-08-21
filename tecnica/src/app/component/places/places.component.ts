import { Component, OnInit } from '@angular/core';

import { RickAndMartyService } from 'src/app/service/rick-and-marty.service';
import { GeneralLocation } from 'src/app/dto/general-location';
import { PlaceLocation } from 'src/app/dto/place-location';
import {MatDialog} from '@angular/material/dialog';
import { LocationDetailComponent } from '../location-detail/location-detail.component';
@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  private service:RickAndMartyService;
  totalPage:number = 0;
  currentPage:number=1;

  generalLocation!:GeneralLocation;
  location: PlaceLocation []=[];


  constructor(service: RickAndMartyService,private dialog: MatDialog) {
    this.service = service;
  }

  ngOnInit(): void {
    this.getAllLocation(this.currentPage);
  }

  selectedRowIndex: number | null = null;

  highlightRow(index: number): void {
    this.selectedRowIndex = index;
  }

  unhighlightRow(): void {
    this.selectedRowIndex = null;
  }


  getAllLocation( page:number){
    this.service.getLocationList("https://rickandmortyapi.com/api/location?page="+page.toString()).subscribe(
    {
      next:(info)=>{
        this.generalLocation = info;
        this.totalPage = info.info.pages;
        this.location= info.results;
        console.log(info)

      }
    });

  }

  backPage(){
    if(this.currentPage != 1){
      this.currentPage = this.currentPage - 1;
      this.getAllLocation(this.currentPage);

    }

  }
  nextPage(){
    if(this.currentPage < this.totalPage){
      this.currentPage = this.currentPage + 1;
      this.getAllLocation(this.currentPage);

    }
  }

  openDialog(name:string,type:string, dimension:string,created:Date) {
    this.dialog.open(LocationDetailComponent, {
      width: '500px',
      data: {name:name,type:type,dimension:dimension,created:created }
    });
  }


}
