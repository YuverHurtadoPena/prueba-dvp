import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CharacterInfo } from 'src/app/dto/character-info';
import { RickAndMartyService } from 'src/app/service/rick-and-marty.service';
@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.css']
})
export class ResidentsComponent implements OnInit {
  characterInfo:CharacterInfo[]=[];
  residents:string[]=[];
  private service:RickAndMartyService;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,service:RickAndMartyService) {
    this.service = service;
   }

  ngOnInit(): void {
   this.residents = this.data.residents;
   this.getResidents();
  }
  getResidents(){
    for (const item of this.residents) {

      this.service.geCharacterOne(item).subscribe(
        {
          next:(info)=>{
            this.characterInfo.push(info);

          }
        });

    }
  }
}
