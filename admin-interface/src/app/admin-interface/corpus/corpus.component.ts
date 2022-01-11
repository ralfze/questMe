
import { E } from '@angular/cdk/keycodes';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AfterContentInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

// Intent Card visual
import { IntentArray } from './intent-array/intent-array.component';


/**
 * @title Korpus Component
 */


@Component({
  selector: 'app-korpus',
  templateUrl: './corpus.component.html',
  styleUrls: ['./corpus.component.scss'],
})

export class CorpusComponent implements OnInit, AfterContentInit {
  // Get the Template from Intent-Array
  @ViewChild(IntentArray) intentAray: IntentArray | undefined;

  webtitle = 'Admin Corpus';

  titleC = 'Corpus List';

  // Selected Item of the Dropdown Menu
  // should show only Corpus for selected
  selected = 'Basis';
  selectedChanged = false;

  changeSelected(bool: boolean) {
    this.selectedChanged = bool;
  }

  // Info about the selected icon in allgemein
  selectedIcon = {
    name: '', src: ''
  };

  // Corpus in Bot laden
  restartBot() {
    this.apiService.restartBot();
  }

  constructor(private title: Title, private keycloakService: KeycloakService, private renderer: Renderer2, private apiService: ApiService) {
  }
  ngAfterContentInit(): void {
    // Create an Observer to update changes of the selected Corpus
    const observer = new Observable<string>(observer => {
      setInterval(() => {
        observer.next(this.selected);      // Update the selected

      }, 1000);
    });
    observer.subscribe((data) => {  // Change selected Corpus of the Intent Array
      if (this.selectedChanged)
        this.intentAray?.setCorpus(data);
        this.selectedChanged = false;
    });
  }

  ngOnInit(): void {
    // Sets title of the webpage
    this.title.setTitle(this.webtitle);
    // Get the selected icon from allgemeinData
    this.refreshAllgemein();
  }



  logout() {
    this.keycloakService.logout('http://localhost:4200');
  }

  // Observer Pattern for selected Corpus


  // REST API
  /**
   * Gets the AllgemeinData
   */
  refreshAllgemein() {
    // Retrieve AllgemeinData
    this.apiService.getAllgemein().subscribe(data => {
      // Retrieve the AllgmeinData
      this.selectedIcon = data.selectedIcon;
    })
  }
}
