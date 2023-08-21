import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GeneralInformation } from '../dto/general-information';
import { InformationGeneralEpisode } from '../dto/information-general-episode';
import { GeneralLocation } from '../dto/general-location';
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

  getLocationList(url:string): Observable<GeneralLocation> {
    return this.httpClient.get<GeneralLocation>(
      `${url}`
    );

  }
}
