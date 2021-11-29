
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { KeycloakService } from 'keycloak-angular';
import { ApiService } from '../api.service';
import { Corpus } from '../corpus';
import { Intent } from '../intent';

@Component({
  selector: 'app-korpus',
  templateUrl: './korpus.component.html',
  styleUrls: ['./korpus.component.scss']
})
export class KorpusComponent implements OnInit {
  webtitle = 'Admin Korpus';

  titleC = 'Korpus-Liste';

  selected = 'basis';

  // fetched corpus
  corpus: Corpus | undefined;

  // intents stores utterance and answers
  intents: Intent[] = [];

  utterances: any[] = [];
  answers: any[] = [];

  addUtterance(item: string) {
    if (item !== "") {
      this.utterances.push({ id: this.utterances.length, name: item })
    } else {
      console.log("No given String!");
    }
    //console.warn(this.utterances);

  }
  removeUtterance(id: number) {
    this.utterances = this.utterances.filter(item => item.id !== id);
    //console.warn(id)
  }

  addAnswer(item: string) {
    if (item !== "") {
      this.answers.push({ id: this.answers.length, name: item })
    } else {
      console.log("No given String!");
    }
    //console.warn(this.answers);
  }

  removeAnswer(id: number) {
    this.answers = this.answers.filter(item2 => item2.id !== id);
    //console.warn(id);
  }



  constructor(private title: Title, private keycloakService: KeycloakService, private apiService: ApiService) { }

  ngOnInit(): void {
    // Sets title of the webpage
    this.title.setTitle(this.webtitle);

    // Loads Corpus
    this.refreshCorpus();
  }
  insertIntent(intent: Intent) {
    intent.utterances.forEach((utterance) => {
      this.addUtterance(utterance);
    });
    intent.answers.forEach((answer) => { this.addAnswer(answer) });

  }
  updateData(corpus: Corpus) {
    this.intents = corpus.data;
    console.log(this.intents);
    this.insertIntent(this.intents[1]);
  }

  // REST API
  refreshCorpus() {
    this.apiService.getCorpus().subscribe(data => {
      console.log(data)
      this.corpus = data;
      this.updateData(this.corpus);
    })
  }

  // END REST API

  logout() {
    this.keycloakService.logout('http://localhost:4200');
  }

}
