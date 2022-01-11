import { Component, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef, ComponentFactoryResolver, ComponentRef, AfterContentInit, Directive, EmbeddedViewRef, ViewRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, throwIfEmpty } from 'rxjs';
import { ApiService } from '../../api.service';
import { Corpus } from '../intent/corpus';
import { Intent } from '../intent/intent';
import { IntentCard } from '../intent/intent-card.component';
import { IntentDialogComponent } from './intent-dialog/intent-dialog.component';

@Component({
  selector: 'intent-array',
  templateUrl: './intent-array.component.html',
  styleUrls: ['./intent-array.component.scss']
})
//@Directive({selector: 'intent-array'})
export class IntentArray implements OnInit, AfterContentInit {
  // Variables
  // valuesChanged shows if an update in the database is needed
  valuesChanged = false;

  // Holds the Intent of the dialog
  // Stores is it temporary
  dialogIntent: Intent = {
    intent: '',
    utterances: [''],
    answers: ['']
  };

  // Array with Intent Cards ComponentRef
  //intCardArray: ComponentRef<IntentCard>[] = [];
  // Subscrition Array to erase subscription on delete
  intCardSubscription: Subscription[] = [];

  @ViewChild('cardContainer', { read: ViewContainerRef }) cardContainer: any;
  //@ViewChild('intent-list', { read: ViewContainerRef })
  //@ViewChild(IntentCard) intentCard: IntentCard | undefined;

  //corpus stores in intents: utterances and answers
  corpus: Corpus = {
    name: '',
    locale: '',
    data: []
  };

  // Selection of the Corpus
  // Defines which Corpus should be displayed
  selectedCorpus = 'Basis';
  selectedChanged = false;

  // sets the chosen corpus
  setCorpus(corpusName: string) {
    // change to given corpusName
    this.selectedCorpus = corpusName;
    // set changes happend
    this.selectedChanged = true;
    console.log('Selected Corpus: ' + this.selectedCorpus);
  }



  /**
   * Creates one single Card
   * @param intent needs an Intent Object to create a card
   */
  createCard(intent: Intent) {
    let componentRef = this.cardContainer.createComponent(IntentCard);
    // set the componentRef to the component itself
    componentRef.instance.compRef = componentRef;
    // Set Intent Array Reference
    componentRef.instance.intentArrayRef = this;
    // Set the intent of the array
    componentRef.instance.setData(intent);
    // subscribe to data Model of Card
    // also add the subscription to the value subscription
    componentRef.instance.subscription = componentRef.instance.intCardObserver.subscribe((data: Intent) => {
      let index = this.corpus.data.indexOf(intent);
      // Update new data Model
      this.corpus.data[index] = data;
      // set values has been changed
      this.valuesChanged = true;
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
    this.apiService.getCorpus(this.selectedCorpus).subscribe(data => {
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


  constructor(private apiService: ApiService, private dialog: MatDialog) {
  }
  ngAfterContentInit(): void {
    // Create an Observer to update changes of the corpus
    const observer = new Observable<Intent[]>(observer => {
      setInterval(() => {
        observer.next(this.corpus.data);      // Update the Corpus
      }, 1000);
    });
    observer.subscribe(data => { if (this.valuesChanged) { this.updateCorpus(); console.log("Update"); this.valuesChanged = false; } });

    // Create an Observer to change to the selected Corpus
    const observer2 = new Observable<string>(observer => {
      setInterval(() => {
        observer.next(this.selectedCorpus);      // change the selected
      }, 1000);
    });

    observer2.subscribe(() => {
      if (this.selectedChanged) {
        // reset selected has changed
        this.selectedChanged = false;

        // Clear the container with the intents
        this.cardContainer.clear();
        // unsubscribe all subscriptions from te last corpus
        this.intCardSubscription.forEach((subscription) => { subscription.unsubscribe(); })
        // reset intCardSubscription
        this.intCardSubscription = [];

        // change Corpus
        this.refreshCorpus();
        console.log(this.corpus);

      }
    });
  }

  ngOnInit(): void {
    // refreshCorpus
    this.refreshCorpus();
  }
  /**
   * Removing an intent
   */
  removeIntent(intent: Intent) {
    // remove intent from  the data model
    let index = this.corpus.data.indexOf(intent);
    this.corpus.data.splice(index, 1);
  }
  /**
   * Method to create a dialog to insert new Intents
   */
  // Adds the DialogIntent to the Corpus
  addDialogIntent(intent: Intent) {
    // push the data into the corpus
    this.corpus.data.push(intent);
    //this.corpus.data.splice(0,0,intent);
    // Create a card of the intent
    this.createCard(intent);
    // set values has been changed
    this.valuesChanged = true;
  }
  cleanDialogData() {
    this.dialogIntent = {
      intent: '',
      utterances: [''],
      answers: ['']
    };
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(IntentDialogComponent, {
      width: '250px',
      data: this.dialogIntent,
    });

    dialogRef.afterClosed().subscribe((result: Intent) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.dialogIntent = result;
        console.log(this.dialogIntent);
        // Add card to the list
        this.addDialogIntent(this.dialogIntent);
        // Clean the temporary dialogIntent
        this.cleanDialogData();
        //console.log(this.corpus.data);
      }
    });
  }
}
