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
import { EinstData } from './einstellungen';


@Component({
  selector: 'app-einstellungen',
  templateUrl: './einstellungen.component.html',
  styleUrls: ['./einstellungen.component.scss']
})
export class EinstellungenComponent implements OnInit {
  webtitle = 'Admin Einstellungen';

  // dataModel of Einstellungen
  einstData: EinstData = {
    professor: [],
    student: [],
    unregistered: []
  }



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
  //corpusStud: string[] = ['Basis', 'Hochschule'];
  //corpusProfessor.prof: string[] = ['Basis', 'Hochschule', 'Interna'];
  //corpusUnregistered: string[] = ['Basis'];

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

      this.einstData.professor.push(value);

    }

    // Clear the input value
    event.chipInput!.clear();


    this.profCtrl.setValue(null);

  }

  addStud(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our Korpusdata
    if (value) {
      this.einstData.student.push(value);

    }

    // Clear the input value
    event.chipInput!.clear();

    this.studCtrl.setValue(null);

  }

  addUnregistered(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our Korpusdata
    if (value) {

      this.einstData.unregistered.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.unregisteredCtrl.setValue(null);
  }

  //remove chips
  removeProf(prof: string): void {
    const index = this.einstData.professor.indexOf(prof);

    if (index >= 0) {
      this.einstData.professor.splice(index, 1);
    }
  }

  removeStud(stud: string): void {
    const index = this.einstData.student.indexOf(stud);

    if (index >= 0) {
      this.einstData.student.splice(index, 1);
    }
  }

  removeUnregistered(unregistered: string): void {
    const index = this.einstData.unregistered.indexOf(unregistered);

    if (index >= 0) {
      this.einstData.unregistered.splice(index, 1);
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
    // Get the einstData
    this.refreshEinstellungen();
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
  /**
     * Gets the EinstData
     */
  refreshEinstellungen() {
    // Retrieve AllgemeinData
    this.apiService.getEinstellungen().subscribe(data => {
      console.log(data);
      // Retrieve the AllgmeinData
      this.einstData = data;
    })
  }
  /**
   * Updates the EinstData Remote Data Model
   */
  updateEinstellungen() {
    // Updates the data Model
    this.apiService.updateEinstellungen(this.einstData);
  }
}
