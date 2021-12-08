import { Component, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef, ComponentFactoryResolver, ComponentRef, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api.service';
import { Corpus } from '../intent/corpus';
import { Intent } from '../intent/intent';
import { IntentCard } from '../intent/intent-card.component';

@Component({
  selector: 'intent-array',
  templateUrl: './intent-array.component.html',
  styleUrls: ['./intent-array.component.scss']
})
export class IntentArray implements OnInit, AfterContentInit {
  // Array with Intent Cards
  intCardArray: ComponentRef<IntentCard>[] | undefined;


  @ViewChild('container', { read: ViewContainerRef })
  //@ViewChild(IntentCard) intentCard: IntentCard | undefined;
  // intents stores utterance and answers
  corpus: Corpus = {
    name: '',
    locale: '',
    data: []
  };

  /**
   * Creates one single Card
   * @param intent needs an Intent Object to create a card
   */
  createCard(intent: Intent) {
    let componentRef = this.container.createComponent(IntentCard);
    componentRef.instance.setData(intent);
    // subscribe to data Model of Card
    componentRef.instance.intCardObserver.subscribe(data => {
      let index = this.corpus.data.indexOf(intent);
      // Update new data Model
      this.corpus.data[index] = data;
    });
  }
  /**
   * Creates a list of Cards
   * @param corpus needs a Corpus Object to create a card
   */
  createCardList(corpus: Corpus) {
    corpus.data.forEach(element => {
      this.createCard(element);
      // subscribe to data

    });
  }
  /**
   * Sets the Corpus data Model of intent-Array
   * @param corpus needs a Corpus Object to create a card
   */
  setDataModel(corpus: Corpus) {
    this.corpus = corpus;
    console.log("Corpus set");
  }

  // REST API
  /**
   * Gets the corpus and creates a card list
   */
  refreshCorpus() {
    // Retrieve Corpus
    this.apiService.getCorpus().subscribe(data => {
      //console.log(data)
      this.corpus = data;
      // Create the card list
      this.createCardList(this.corpus);
    })
  }

  updateCorpus() {
    this.apiService.updateCorpus(this.corpus);
  }
  // END REST API


  constructor(private apiService: ApiService, private componentFactoryResolver: ComponentFactoryResolver, private container: ViewContainerRef) {
  }
  ngAfterContentInit(): void {
    // Create an Observer to update changes of the corpus

    const observer = new Observable<Intent[]>(observer => {
      setInterval(() => {
        observer.next(this.corpus.data);      // Update the Corpus
        this.updateCorpus();
      }, 1000);
    });
    observer.subscribe(data => /*console.log(data)*/console.log("Update"));
  }

  ngOnInit(): void {
    // refreshCorpus
    this.refreshCorpus();
    /*
    const testO = new Observable<Intent[]>(observer => {
      setInterval(() => observer.next(this.corpus.data), 1000);
    });
    testO.subscribe(data => console.log(data));
    */
  }

}
