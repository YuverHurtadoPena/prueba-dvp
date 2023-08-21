import { Component, OnInit } from '@angular/core';

import { CharacterInfo } from 'src/app/dto/character-info';
import { GeneralInformation } from 'src/app/dto/general-information';
import { InformationPage } from 'src/app/dto/information-page';
import { RickAndMartyService } from 'src/app/service/rick-and-marty.service';
import Swal from 'sweetalert2';
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


      },
      error:()=>{
        Swal.fire({
          title: 'Error',
          text: 'An error has occurred in the operation.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });

  }



  backPage(){
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch==null){
      this.selectedStatus == "all";
    }else{
      this.selectedStatus =lastSearch;
    }
    if(this.currentPage != 1){
      this.currentPage = this.currentPage - 1;
       if(lastSearch == "all"){
        this.getCharacter(this.currentPage);
      }else{
        this.getCharactersByStatus(this.selectedStatus ,this.currentPage);
      }

    }

  }
  nextPage(){
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch==null){
      this.selectedStatus == "all";
    }else{
      this.selectedStatus =lastSearch;
    }
    if(this.currentPage < this.totalPage){
      this.currentPage = this.currentPage + 1;
      if(lastSearch == "all"){
        this.getCharacter(this.currentPage);
      }else{
        this.getCharactersByStatus(this.selectedStatus ,this.currentPage);
      }

    }
  }

  openDialog(image:string,name:string, status:string, species:string,gender:string, created:Date, location:string,origin:string) {
    this.dialog.open(CharacterDetailComponent, {
      width: '500px',
      data: { image: image, name:name, status:status, species, gender:gender, created:created,location:location,origin:origin }
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


      }
    });

  }

  getCharactersByStatus(status: string,page:number) {

    this.listObjectCharacterInfo = [];
    this.service.getChararcterList("https://rickandmortyapi.com/api/character/?page="+page+"&status="+status).subscribe(
    {
      next: (info) => {
        // Dentro de algún método o evento en tu componente


        this.generalInfo = info;
        this.totalPage = info.info.pages;
        this.listObjectCharacterInfo = info.results;
      },
      error:()=>{
        Swal.fire({
          title: 'Error',
          text: 'An error has occurred in the operation.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }




  onStatusChange(status: string) {
    this.currentPage = 1;

      localStorage.setItem('lastSearch', status);
       if(status == "all"){
        this.getCharacter(this.currentPage);
       }else{
        this.getCharactersByStatus(status,this.currentPage)
       }

  }

  removeDuplicates(array: any[], key: string): any[] {
    return array.filter((obj, index, self) =>
      index === self.findIndex((el) => el[key] === obj[key])
    );}

}
