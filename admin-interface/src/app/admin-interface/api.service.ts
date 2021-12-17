// Tutorial src https://www.tektutorialshub.com/angular/angular-http-post-example/

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Corpus } from './corpus/intent/corpus';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Intent } from './corpus/intent/intent';
import { AllgemeinSettings } from './allgemein/allgemein';

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
  getCorpus(): Observable<Corpus> {
    console.log('Corpus ' + this.baseURL + 'restapi/corpus')
    return this.http.get<Corpus>(this.baseURL + 'restapi/corpus')
  }
  getAllgemein(): Observable<AllgemeinSettings> {
    console.log('Allgemein ' + this.baseURL + 'restapi/allgemein')
    return this.http.get<AllgemeinSettings>(this.baseURL + 'restapi/allgemein')
  }

  // UPDATE
  updateCorpus(sendData: Corpus) {
    const body = {
      name: "Corpus",
      locale: "de-DE",
      data: sendData.data
    };

    //console.log(body);
    this.http.put<any>(this.baseURL + 'restapi/corpus/name/Corpus', body).subscribe();
  }

  updateAllgemein(sendData: AllgemeinSettings) {
    const body = {
      sendData
    };
    //console.log(body);
    this.http.put<any>(this.baseURL + 'restapi/allgemein', body).subscribe();
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
