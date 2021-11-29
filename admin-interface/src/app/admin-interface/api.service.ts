// Tutorial src https://www.tektutorialshub.com/angular/angular-http-post-example/

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Corpus } from './corpus';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

  baseURL: string = "http://localhost:3001/";

  constructor(private http: HttpClient) {
  }

  getCorpus(): Observable<Corpus> {
    console.log('Corpus ' + this.baseURL + 'restapi/corpus')
    return this.http.get<Corpus>(this.baseURL + 'restapi/corpus')
  }
  /*
   addPerson(person:Person): Observable<any> {
     const headers = { 'content-type': 'application/json'}
     const body=JSON.stringify(person);
     console.log(body)
     return this.http.post(this.baseURL + 'people', body,{'headers':headers})
   }*/

}
