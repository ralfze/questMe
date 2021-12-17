
import { Component, ComponentRef, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IntentArray } from '../intent-array/intent-array.component';
import { Intent } from './intent';


@Component({
  selector: 'intent-card',
  templateUrl: './intent-card.component.html',
  styleUrls: ['./intent-card.component.scss'],
})
export class IntentCard implements OnInit, OnDestroy {
  // variables
  // Subscription of this IntentCard
  subscription!: Subscription;
  // Reference to Intent Array
  intentArrayRef!: IntentArray;
  // Reference to ComponentRef of this Intent Card
  compRef!: ComponentRef<IntentCard>;
  valuesChanged = false;
  observerInterval = 500;

  // Observer for changes in the data Model
  intCardObserver = new Observable<Intent>(observer => {
    setInterval(() => {
      // Only change the data in the Intent Array Component when data has been changed
      if (this.valuesChanged) {
        observer.next(this.intent), this.observerInterval
        this.setValuesChanged(false);
      }
    });
  })


  intent: Intent = {
    intent: "Test",
    utterances: ["utt1", "utt2"],
    answers: ["ans1", "ans2"]
  }
  // Add Button variables
  butUttIsDisabled: boolean = false;
  butAnsIsDisabled: boolean = false;

  //Input Field variables
  inputUtt: string = "";
  inputAns: string = "";
  inputInt: string = "";

  // if the edit Intent Input Field is disabled
  inputIntIsDisabled: boolean = false;

  select() {
    console.log("Select");
    //console.log(evt);
  }
  // activate Input Field
  actInputUtt() {
    // deactivate add Button
    this.butUttIsDisabled = true;
  }
  actInputAns() {
    // deactivate add Button
    this.butAnsIsDisabled = true;
  }
  // deactivate Input Field
  // need string to add utterance/answer
  deactInputUtt(s: string) {
    // dectivate add Button
    this.butUttIsDisabled = false;
    // add string
    this.addUtt(s);
    // clear input
    this.clearUttInput();
  }
  deactInputAns(s: string) {
    // dectivate add Button
    this.butAnsIsDisabled = false;
    // add string
    this.addAns(s);
    // clear input
    this.clearAnsInput();
  }
  // clear input Fields
  clearUttInput() {
    this.inputUtt = "";
  }
  clearAnsInput() {
    this.inputAns = "";
  }

  // abort input Utt/Ans
  abortUttInput() {
    // activate add button
    this.butUttIsDisabled = false;
    // clear input
    this.clearUttInput();
  }
  abortAnsInput() {
    // activate add button
    this.butAnsIsDisabled = false;
    // clear input
    this.clearAnsInput();
  }

  // add item Utt/Ans
  addUtt(s: string) {
    this.intent.utterances.push(s);
    // shows the need of an update fetch from the observer
    this.setValuesChanged(true);
  }
  addAns(s: string) {
    this.intent.answers.push(s);
    // shows the need of an update fetch from the observer
    this.setValuesChanged(true);
  }

  // Remove item Utt/Ans
  removeUtt(s: string) {
    // -1 none found
    let index = -1;
    // find the indexOf the utterance
    index = this.intent.utterances.indexOf(s);
    // check if found
    if (index >= 0 && index !== undefined) {
      // remove when exists
      this.intent.utterances.splice(index, 1);
    }
    // shows the need of an update fetch from the observer
    this.setValuesChanged(true);
  }
  removeAns(s: string) {
    // -1 none found
    let index = -1;
    // find the indexOf the utterance
    index = this.intent.answers.indexOf(s);
    // check if found
    if (index >= 0 && index !== undefined) {
      // remove when exists
      this.intent.answers.splice(index, 1);
    }
    // shows the need of an update fetch from the observer
    this.setValuesChanged(true);
  }

  // Intent Value Methods
  abortIntInput() {
    // deactivate input field
    this.deactInputInt();
  }

  actInputInt() {
    // take new value of data model
    this.inputInt = this.intent.intent;
    //  activate Input Intent
    this.inputIntIsDisabled = true;
  }

  deactInputInt() {
    // deactivate Input Intent
    this.inputIntIsDisabled = false;
  }
  editIntent(s: string) {
    if (s !== '') {
      // set new Intent name
      this.intent.intent = s;
      // shows the need of an update fetch from the observer
      this.setValuesChanged(true);
    }
    this.deactInputInt();
  }
  // Methods to set DataModel
  setData(intent: Intent) {
    this.intent = intent;
    //console.log("intent set");
  }
  // Method to set the need of an update
  // Informs the Observer of changed Values
  setValuesChanged(bool: boolean) {
    this.valuesChanged = bool;
  }

  // IntentCard Constructor
  constructor() {
  }
  ngOnDestroy(): void {
    // destroy the subscription on destroy
    this.subscription.unsubscribe();
    //console.log("Unsubscribed");
  }
  ngOnInit(): void {
    //
  }
  removeCard() {
    // Remove Card from Intent Array
    //this.intentArrayRef.removeIntent(this.intent);
    this.intentArrayRef.removeIntent(this.intent);
    console.log("Remove Card");
    // Destroy this component
    this.compRef.destroy();
  }
}
