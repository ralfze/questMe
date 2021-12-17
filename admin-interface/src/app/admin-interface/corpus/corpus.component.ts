
import { E } from '@angular/cdk/keycodes';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { KeycloakService } from 'keycloak-angular';
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

export class CorpusComponent implements OnInit {
  // Get the Template from Intent-Array
  @ViewChild(IntentArray) intentAray: IntentArray | undefined;

  webtitle = 'Admin Korpus';

  titleC = 'Korpus-Liste';

  selected = 'basis';

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

  ngOnInit(): void {
    // Sets title of the webpage
    this.title.setTitle(this.webtitle);
    // Get the selected icon from allgemeinData
    this.refreshAllgemein();
  }



  logout() {
    this.keycloakService.logout('http://localhost:4200');
  }

  /// REST API
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
