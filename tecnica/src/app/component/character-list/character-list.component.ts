import { Component, OnInit } from '@angular/core';

import { CharacterInfo } from 'src/app/dto/character-info';
import { GeneralInformation } from 'src/app/dto/general-information';
import { InformationPage } from 'src/app/dto/information-page';
import { RickAndMartyService } from 'src/app/service/rick-and-marty.service';

import {MatDialog} from '@angular/material/dialog';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  selectedStatus = 'all';

  totalPage:number = 0;
  currentPage:number=1;
  searchTerm = '';

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
    localStorage.setItem('lastSearch', "all");
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

  openDialog(image:string,name:string, status:string, species:string,gender:string, created:Date) {
    this.dialog.open(CharacterDetailComponent, {
      width: '500px',
      data: { image: image, name:name, status:status, species, gender:gender, created:created }
    });
  }


  getByName(){
    this.listObjectCharacterInfo = [];
    this.service.getChararcterList("https://rickandmortyapi.com/api/character/?page=1&name="+this.searchTerm).subscribe(
    {
      next:(info)=>{
        const uniqueCharacters = this.removeDuplicates(info.results, 'name');
        console.log(uniqueCharacters)
        this.generalInfo = info;
        this.totalPage = info.info.pages;

        this.listObjectCharacterInfo = uniqueCharacters;
        console.log(info)

      }
    });

  }

  getCharactersByStatus(status: string) {
    this.listObjectCharacterInfo = [];
    this.service.getChararcterList(`https://rickandmortyapi.com/api/character/?page=1&status=${status}`).subscribe(
    {
      next: (info) => {
        this.generalInfo = info;
        this.totalPage = info.info.pages;
        this.listObjectCharacterInfo = info.results;
      }
    });
  }


  filter(){
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch == "all"){

    }
  }

  onStatusChange(status: string) {

      this.getCharactersByStatus(status); // Filtrar por estado

  }

  removeDuplicates(array: any[], key: string): any[] {
    return array.filter((obj, index, self) =>
      index === self.findIndex((el) => el[key] === obj[key])
    );}

}
