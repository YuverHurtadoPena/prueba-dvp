import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GeneralInformation } from '../dto/general-information';
import { InformationGeneralEpisode } from '../dto/information-general-episode';
@Injectable({
  providedIn: 'root'
})
export class RickAndMartyService {

  private httpClient: HttpClient;



  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;

  }
  getChararcterList(url:string): Observable<GeneralInformation> {
    return this.httpClient.get<GeneralInformation>(
      `${url}`
    );

  }

  getEpisodeList(url:string): Observable<InformationGeneralEpisode> {
    return this.httpClient.get<InformationGeneralEpisode>(
      `${url}`
    );

  }
}
