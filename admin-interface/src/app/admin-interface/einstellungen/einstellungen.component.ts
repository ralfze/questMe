import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { KeycloakService } from 'keycloak-angular';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-einstellungen',
  templateUrl: './einstellungen.component.html',
  styleUrls: ['./einstellungen.component.scss']
})
export class EinstellungenComponent implements OnInit {
  webtitle = 'Admin Einstellungen';

  selectableProf = true;
  selectableStud = true;
  selectableUnregistered = true;
  unregisteredRemoveable = true;
  profRemoveable = true;
  studRemoveable = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  studCtrl = new FormControl();
  profCtrl = new FormControl();
  unregisteredCtrl = new FormControl();
  corpusStud: string[] = ['Basis', 'Hochschule'];
  corpusProf: string[] = ['Basis', 'Hochschule', 'Interna'];
  corpusUnregistered: string[] = ['Basis'];

  // Info about the selected icon in allgemein
  selectedIcon = {
    name: '', src: ''
  };

  @ViewChild('unregisteredInput')
  unregisteredInput!: ElementRef<HTMLInputElement>;

  @ViewChild('studInput')
  studInput!: ElementRef<HTMLInputElement>;

  @ViewChild('profInput')
  profInput!: ElementRef<HTMLInputElement>;

  constructor(private title: Title, private apiService: ApiService, private keycloakService: KeycloakService) {

  }


  //add chips
  addProf(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our Korpusdata
    if (value) {

      this.corpusProf.push(value);

    }

    // Clear the input value
    event.chipInput!.clear();


    this.profCtrl.setValue(null);

  }

  addStud(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our Korpusdata
    if (value) {
      this.corpusStud.push(value);

    }

    // Clear the input value
    event.chipInput!.clear();

    this.studCtrl.setValue(null);

  }

  addUnregistered(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our Korpusdata
    if (value) {

      this.corpusUnregistered.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.unregisteredCtrl.setValue(null);
  }

  //remove chips
  removeProf(prof: string): void {
    const index = this.corpusProf.indexOf(prof);

    if (index >= 0) {
      this.corpusProf.splice(index, 1);
    }
  }

  removeStud(stud: string): void {
    const index = this.corpusStud.indexOf(stud);

    if (index >= 0) {
      this.corpusStud.splice(index, 1);
    }
  }

  removeUnregistered(unregistered: string): void {
    const index = this.corpusUnregistered.indexOf(unregistered);

    if (index >= 0) {
      this.corpusUnregistered.splice(index, 1);
    }
  }

  /* selected(event: MatAutocompleteSelectedEvent): void {
     this.users.push(event.option.viewValue);
     this.userInput.nativeElement.value = '';
     this.userCtrl.setValue(null);
   }

   private _filter(value: string): string[] {
     const filterValue = value.toLowerCase();

     return this.allusers.filter(prof => prof.toLowerCase().includes(filterValue)),
     this.allusers.filter(stud => stud.toLowerCase().includes(filterValue))
     ;
   }
 */



  ngOnInit(): void {
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
