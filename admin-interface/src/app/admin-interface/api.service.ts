// Tutorial src https://www.tektutorialshub.com/angular/angular-http-post-example/

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Corpus } from './corpus/intent/corpus';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Intent } from './corpus/intent/intent';
import { AllgemeinSettings } from './allgemein/allgemein';
import { EinstData } from './einstellungen/einstellungen';


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
  getAllgemein(): Observable<AllgemeinSettings> {
    console.log('Allgemein ' + this.baseURL + 'restapi/allgemein')
    return this.http.get<AllgemeinSettings>(this.baseURL + 'restapi/allgemein')
  }
  getEinstellungen(): Observable<EinstData> {
    console.log('Einstellungen ' + this.baseURL + 'restapi/einstellungen')
    return this.http.get<EinstData>(this.baseURL + 'restapi/einstellungen')
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
      case 'SWB4':
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

  updateAllgemein(sendData: AllgemeinSettings) {
    const body = {
      sendData
    };
    //console.log(body);
    this.http.put<any>(this.baseURL + 'restapi/allgemein', body).subscribe();
  }
  updateEinstellungen(sendData: EinstData) {
    const body = {
      sendData
    };
    //console.log(body);
    this.http.put<any>(this.baseURL + 'restapi/einstellungen', body).subscribe();
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

  /*
   addPerson(person:Person): Observable<any> {
     const headers = { 'content-type': 'application/json'}
     const body=JSON.stringify(person);
     console.log(body)
     return this.http.post(this.baseURL + 'people', body,{'headers':headers})
   }*/

}
