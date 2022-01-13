import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { KeycloakService } from 'keycloak-angular';
import { ApiService } from '../api.service';
import { SettingsData} from './settings';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  webtitle = 'Admin Settings Page';

  selectable: string[] = ['Basis', 'Hochschule', 'Interna'];
  // dataModel of Einstellungen
  settingsData: SettingsData = {
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

  constructor(private title: Title, private apiService: ApiService, private keycloakService: KeycloakService) {

  }

  // Add Chip
  addChip(s: string) {
    // Depending on which Select is triggered
    switch (s) {
      case "Professor":
        if (!this.chipExists(s)) {
          this.settingsData.professor.push(this.profCtrl.value);
          // update remote data model
          this.updateSettings();
        }
        this.profCtrl.setValue(null); break;
      case "Student":
        if (!this.chipExists(s)) {
          this.settingsData.student.push(this.studCtrl.value);
          // update remote data model
          this.updateSettings();
        }
        this.studCtrl.setValue(null); break;
      case "Unregistered":
        if (!this.chipExists(s)) {
          this.settingsData.unregistered.push(this.unregisteredCtrl.value);
          // update remote data model
          this.updateSettings();
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
        this.removeFromArray(item, this.settingsData.professor);
        // update remote data model
        this.updateSettings();
        break;
      case "Student":
        this.removeFromArray(item, this.settingsData.student);
        // update remote data model
        this.updateSettings();
        break;
      case "Unregistered":
        this.removeFromArray(item, this.settingsData.unregistered);
        // update remote data model
        this.updateSettings();
        break;
      default: break;
    }
  }
  // Check if already chosen
  chipExists(s: string): boolean {
    // Returns true when exits in Array
    switch (s) {
      case "Professor": if (!this.checkArray(this.profCtrl.value, this.settingsData.professor)) return false; else return true;
      case "Student": if (!this.checkArray(this.studCtrl.value, this.settingsData.student)) return false; else return true;
      case "Unregistered": if (!this.checkArray(this.unregisteredCtrl.value, this.settingsData.unregistered)) return false; else return true;
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
    this.refreshGeneral();
    // Get the einstData
    this.refreshSettings();
  }
  logout() {
    this.keycloakService.logout('http://localhost:4200');
  }


  /// REST API
  /**
   * Gets the AllgemeinData
   */
  refreshGeneral() {
    // Retrieve AllgemeinData
    this.apiService.getGeneral().subscribe(data => {
      // Retrieve the generalData
      this.selectedIcon = data.selectedIcon;
    })
  }
  /**
     * Gets the EinstData
     */
  refreshSettings() {
    // Retrieve AllgemeinData
    this.apiService.getSettings().subscribe(data => {
      // console.log(data);
      // Retrieve the generalData
      this.settingsData = data;
    })
  }
  /**
   * Updates the EinstData Remote Data Model
   */
  updateSettings() {
    // Updates the data Model
    this.apiService.updateSettings(this.settingsData);
  }
}
