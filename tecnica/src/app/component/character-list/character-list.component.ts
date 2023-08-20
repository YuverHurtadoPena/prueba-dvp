import { Component, OnInit } from '@angular/core';

import { CharacterInfo } from 'src/app/dto/character-info';
import { GeneralInformation } from 'src/app/dto/general-information';
import { InformationPage } from 'src/app/dto/information-page';
import { RickAndMartyService } from 'src/app/service/rick-and-marty.service';
import { Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  totalPage:number = 0;
  currentPage:number=1;

  private service:RickAndMartyService;
  listObjectCharacterInfo:CharacterInfo[]=[];
  generalInfo!: GeneralInformation;
  informationPage!:InformationPage;

  constructor(private dialog: MatDialog,
  service: RickAndMartyService ) {
    this.service = service;

  }

  ngOnInit(): void {
    this.getCharacter(this.currentPage);
  }
  getCharacter( page:number){
    this.service.getChararcterList("https://rickandmortyapi.com/api/character?page="+page.toString()).subscribe(
    {
      next:(info)=>{
        this.generalInfo = info;
        this.totalPage = info.info.pages;
        this.listObjectCharacterInfo = info.results;
        console.log(info)

      }
    });

  }

  backPage(){
    if(this.currentPage != 1){
      this.currentPage = this.currentPage - 1;
      this.getCharacter(this.currentPage);

    }

  }
  nextPage(){
    if(this.currentPage < this.totalPage){
      this.currentPage = this.currentPage + 1;
      this.getCharacter(this.currentPage);

    }
  }

  openDialog() {
    this.dialog.open(CharacterDetailComponent, {
      width: '500px', // Ancho del modal
      data: { id: 123 } // Datos opcionales para pasar al componente
    });
  }


}
