import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
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

  selectable: string[] = ['Basis', 'Hochschule', 'Interna'];
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

  // Add Chip
  addChip(s: string) {
    // Depending on which Select is triggered
    switch (s) {
      case "Professor":
        if (!this.chipExists(s)) {
          this.einstData.professor.push(this.profCtrl.value);
          // update remote data model
          this.updateEinstellungen();
        }
        this.profCtrl.setValue(null); break;
      case "Student":
        if (!this.chipExists(s)) {
          this.einstData.student.push(this.studCtrl.value);
          // update remote data model
          this.updateEinstellungen();
        }
        this.studCtrl.setValue(null); break;
      case "Unregistered":
        if (!this.chipExists(s)) {
          this.einstData.unregistered.push(this.unregisteredCtrl.value);
          // update remote data model
          this.updateEinstellungen();
        }
        this.unregisteredCtrl.setValue(null); break;
      default: break;
    }
  }

  // Remove Chip
  removeChip(s: string, item: string) {
    // Depending on which Select is triggered
    switch (s) {
      case "Professor":
        this.removeFromArray(item, this.einstData.professor);
        // update remote data model
        this.updateEinstellungen();
        break;
      case "Student":
        this.removeFromArray(item, this.einstData.student);
        // update remote data model
        this.updateEinstellungen();
        break;
      case "Unregistered":
        this.removeFromArray(item, this.einstData.unregistered);
        // update remote data model
        this.updateEinstellungen();
        break;
      default: break;
    }
  }
  // Check if already chosen
  chipExists(s: string): boolean {
    // Returns true when exits in Array
    switch (s) {
      case "Professor": if (!this.checkArray(this.profCtrl.value, this.einstData.professor)) return false; else return true;
      case "Student": if (!this.checkArray(this.studCtrl.value, this.einstData.student)) return false; else return true;
      case "Unregistered": if (!this.checkArray(this.unregisteredCtrl.value, this.einstData.unregistered)) return false; else return true;
      default: return true;
    }
  }
  checkArray(checkItem: string, array: string[]): boolean {
    // Return true if checkItem exists in the given Array
    let exists = false;
    array.forEach((item) => { if (item === checkItem) exists = true; })
    return exists;
  }

  // Removes an item from the array
  removeFromArray(removeItem: string, array: string[]) {
    const index = array.indexOf(removeItem);

    if (index >= 0) {
      array.splice(index, 1);
    }
  }

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
      // console.log(data);
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
