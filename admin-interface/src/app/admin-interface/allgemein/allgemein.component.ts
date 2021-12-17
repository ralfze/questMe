import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { AllgemeinSettings } from './allgemein';

@Component({
  selector: 'app-allgemein',
  templateUrl: './allgemein.component.html',
  styleUrls: ['./allgemein.component.scss'],
})
export class AllgemeinComponent implements OnInit, AfterContentInit {
  webtitle = 'Admin Allgemein';

  constructor(private title: Title, private keycloakService: KeycloakService, private apiService: ApiService) {
  }
  // Variable to check if changed
  isChanged = false;

  // DataModel of Allgmein Website
  allgemeinData: AllgemeinSettings = {
    botName: '',
    selectedIcon: { name: '', condition: false, src: '' }
  };

  selectedIcon: string = '';
  condition = false;
  iconArray: any[] = [
    { name: 'Bot picture 01', condition: false, src: 'assets/images/Bot Picture.png' },
    { name: 'Bot picture 02', condition: false, src: 'assets/images/Bot Picture(1).png' },
    { name: 'Bot picture 03', condition: false, src: 'assets/images/Bot Picture(2).png' },
    { name: 'Bot picture 04', condition: false, src: 'assets/images/Bot Picture(3).png' },
    { name: 'Bot picture default', condition: false, src: 'assets/images/image 10.png' },
    { name: 'Bot picture fun', condition: false, src: 'assets/images/image 16.png' },
  ];

  chooseIcon(event: any) {
    //set all Icons of condition false
    this.iconArray.forEach((icon) => {
      icon.condition = false;
    });
    //console.log(this.iconArray);

    //set selected Icon to true
    let iconObj = this.iconArray.find((e) => e.name === event.target.alt);
    if (iconObj !== undefined) {
      iconObj.condition = true;
      //choosen icon copy datamodel
      this.allgemeinData.selectedIcon = iconObj;
    }
    // Something has changed update needed at the db
    this.isChanged = true;
  }
  ngAfterContentInit(): void {
    // Create an Observer to update changes of Allgemein

    const observer = new Observable<AllgemeinSettings>(observer => {
      setInterval(() => {
        if (this.isChanged === true) {
          observer.next(this.allgemeinData);      // Update the AllgemeinData
          this.updateAllgemein();
          // set needed update back
          this.isChanged = false;
        }
      }, 1000);
    });
    observer.subscribe(data => /*console.log(data)*/console.log("Update Allgemein"));
  }
  ngOnInit(): void {
    this.title.setTitle(this.webtitle);
    this.allgemeinData.selectedIcon = this.iconArray[0];
    // Fetch from mongodb
    this.refreshAllgemein();
  }
  logout() {
    this.keycloakService.logout('http://localhost:4200');
  }
  // Trigger when the input field value changed
  onChange() {
    this.isChanged = true;
  }
  /// REST API
  /**
   * Gets the AllgemeinData
   */
  refreshAllgemein() {
    // Retrieve AllgemeinData
    this.apiService.getAllgemein().subscribe(data => {
      console.log(data);
      // Retrieve the AllgmeinData
      this.allgemeinData = data;
      // Change the condition of the actual chosen element
      this.iconArray.forEach((ele) => {
        if (ele.name === this.allgemeinData.selectedIcon.name) {
          // update the chosen element
          ele.condition = true;
        }
      })
    })
  }

  updateAllgemein() {
    // Updates the data Model
    this.apiService.updateAllgemein(this.allgemeinData);
  }
  // END REST API

}
