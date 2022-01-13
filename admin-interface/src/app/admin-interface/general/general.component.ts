import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { GeneralSettings } from './general';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit, AfterContentInit {
  webtitle = 'Admin General Page';

  constructor(private title: Title, private keycloakService: KeycloakService, private apiService: ApiService) {
  }
  // Variable to check if changed
  isChanged = false;

  // DataModel of Allgmein Website
  generalData: GeneralSettings = {
    botName: '',
    selectedIcon: { name: '', condition: false, src: '' }
  };

  selectedIcon: string = '';
  condition = false;
  iconArray: any[] = [
    { name: 'Bot picture 00', condition: false, src: 'assets/images/chatbot_00.png' },
    { name: 'Bot picture 01', condition: false, src: 'assets/images/chatbot_01.png' },
    { name: 'Bot picture 02', condition: false, src: 'assets/images/chatbot_02.png' },
    { name: 'Bot picture 03', condition: false, src: 'assets/images/chatbot_03.png' },
    { name: 'Bot picture 04', condition: false, src: 'assets/images/chatbot_04.png' },
    { name: 'Bot picture 05', condition: false, src: 'assets/images/chatbot_05.png' },
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
      this.generalData.selectedIcon = iconObj;
    }
    // Something has changed update needed at the db
    this.isChanged = true;
  }
  ngAfterContentInit(): void {
    // Create an Observer to update changes of Allgemein

    const observer = new Observable<GeneralSettings>(observer => {
      setInterval(() => {
        if (this.isChanged === true) {
          observer.next(this.generalData);      // Update the AllgemeinData
          this.updateGeneral();
          // set needed update back
          this.isChanged = false;
        }
      }, 1000);
    });
    observer.subscribe(data => /*console.log(data)*/console.log("Update Allgemein"));
  }
  ngOnInit(): void {
    this.title.setTitle(this.webtitle);
    this.generalData.selectedIcon = this.iconArray[0];
    // Fetch from mongodb
    this.refreshGeneral();
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
  refreshGeneral() {
    // Retrieve AllgemeinData
    this.apiService.getGeneral().subscribe(data => {
      console.log(data);
      // Retrieve the AllgmeinData
      this.generalData = data;
      // Change the condition of the actual chosen element
      this.iconArray.forEach((ele) => {
        if (ele.name === this.generalData.selectedIcon.name) {
          // update the chosen element
          ele.condition = true;
        }
      })
    })
  }

  updateGeneral() {
    // Updates the data Model
    this.apiService.updateGeneral(this.generalData);
  }
  // END REST API

}
