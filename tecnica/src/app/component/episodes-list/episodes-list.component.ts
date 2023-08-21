import { EpisodesDetailComponent } from './../episodes-detail/episodes-detail.component';
import { Component, OnInit } from '@angular/core';
import { InformationEpisode } from 'src/app/dto/information-episode';
import { InformationGeneralEpisode } from 'src/app/dto/information-general-episode';
import { RickAndMartyService } from 'src/app/service/rick-and-marty.service';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.css']
})
export class EpisodesListComponent implements OnInit {
  totalPage:number = 0;
  currentPage:number=1;

  private service:RickAndMartyService;
  informationGeneralEpisode!: InformationGeneralEpisode;
  informationEpisode:InformationEpisode[]=[];
  constructor(service: RickAndMartyService, private dialog: MatDialog) {
    this.service = service;
   }

  ngOnInit(): void {
    this.getAllEpisode(this.currentPage);

  }
  selectedRowIndex: number | null = null;

  highlightRow(index: number): void {
    this.selectedRowIndex = index;
  }

  unhighlightRow(): void {
    this.selectedRowIndex = null;
  }


  getAllEpisode( page:number){
    this.service.getEpisodeList("https://rickandmortyapi.com/api/episode?page="+page.toString()).subscribe(
    {
      next:(info)=>{
        this.informationGeneralEpisode = info;
        this.totalPage = info.info.pages;
        this.informationEpisode= info.results;
        console.log(info)

      }
    });

  }

  backPage(){
    if(this.currentPage != 1){
      this.currentPage = this.currentPage - 1;
      this. getAllEpisode(this.currentPage);

    }

  }
  nextPage(){
    if(this.currentPage < this.totalPage){
      this.currentPage = this.currentPage + 1;
      this. getAllEpisode(this.currentPage);

    }
  }


  openDialog(name:string, id:number, air_date:string, episode:string) {
    this.dialog.open(EpisodesDetailComponent, {
      width: '500px',
      data: { name:name, id:id,air_date:air_date, episode:episode}
    });
  }

}
