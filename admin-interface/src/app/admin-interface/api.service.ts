// Tutorial src https://www.tektutorialshub.com/angular/angular-http-post-example/

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Corpus } from './corpus/intent/corpus';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Intent } from './corpus/intent/intent';
import { GeneralSettings as GeneralSettings } from './general/general';
import { SettingsData } from './settingspage/settings';


@Injectable({ providedIn: 'root' })
export class ApiService {

  baseURL: string = "http://localhost:3001/";

  constructor(private http: HttpClient) {
  }

  // CREATE
  createIntent(sendData: Intent) {
    this.http.post<any>(this.baseURL + 'restapi/corpus/intent', sendData).subscribe();
  }
  // READ
  getCorpus(collecionName: string): Observable<Corpus> {
    // Change URL to the right collection
    let corpusUrl;
    switch (collecionName) {
      case 'Basis':
        corpusUrl = 'restapi/corpus/collection/dataC';
        break;
      case 'Hochschule':
        corpusUrl = 'restapi/corpus/collection/swb4';
        break;
      case 'Interna':
        // change to the right corpus Interna
        corpusUrl = 'restapi/corpus/collection/interna';
        break;
      default:
        // Use default
        corpusUrl = 'restapi/corpus/collection/dataC';
        break;
    }
    //console.log('Corpus ' + this.baseURL + 'restapi/corpus')
    // return this.http.get<Corpus>(this.baseURL + 'restapi/corpus')
    return this.http.get<Corpus>(this.baseURL + corpusUrl)
  }
  getGeneral(): Observable<GeneralSettings> {
    console.log('General ' + this.baseURL + 'restapi/general')
    return this.http.get<GeneralSettings>(this.baseURL + 'restapi/general')
  }
  getSettings(): Observable<SettingsData> {
    console.log('Settings ' + this.baseURL + 'restapi/settings')
    return this.http.get<SettingsData>(this.baseURL + 'restapi/settings')
  }

  // UPDATE
  updateCorpus(sendData: Corpus) {
    const body = {
      name: sendData.name,
      locale: sendData.locale,
      data: sendData.data
    };
    // Update the send Corpus

    // Change URL to the right collection
    let corpusUrl;
    switch (sendData.name) {
      case 'Corpus':
        corpusUrl = 'restapi/corpus/collection/dataC';
        break;
      case 'Hochschule':
        corpusUrl = 'restapi/corpus/collection/swb4';
        break;
      case 'Interna':
        // change to the right corpus Interna
        corpusUrl = 'restapi/corpus/collection/interna';
        break;
      default:
        // Use default
        corpusUrl = 'restapi/corpus/collection/dataC';
        break;
    }

    this.http.put<any>(this.baseURL + corpusUrl, body).subscribe();
  }

  updateGeneral(sendData: GeneralSettings) {
    const body = {
      sendData
    };
    //console.log(body);
    this.http.put<any>(this.baseURL + 'restapi/general', body).subscribe();
  }

  updateSettings(sendData: SettingsData) {
    const body = {
      sendData
    };
    //console.log(body);
    this.http.put<any>(this.baseURL + 'restapi/settings', body).subscribe();
  }

  // DELETE
  deleteIntent(sendData: Intent) {
    //this.http.delete<any>(this.baseURL + 'restapi/corpus/intent', sendData).subscribe();
  }

  // Restart Bot
  restartBot() {
    let key = { key: 12345 };
    this.http.post<any>(this.baseURL + 'restapi/bot/restart', key).subscribe();
  }
}
