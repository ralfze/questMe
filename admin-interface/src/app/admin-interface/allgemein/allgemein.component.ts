import { Component, OnInit } from '@angular/core';
import { MatCheckboxClickAction } from '@angular/material/checkbox';
import { Title } from '@angular/platform-browser';
import { KeycloakService } from 'keycloak-angular';
import { AllgemeinSettings } from './allgemein';

@Component({
  selector: 'app-allgemein',
  templateUrl: './allgemein.component.html',
  styleUrls: ['./allgemein.component.scss'],
})
export class AllgemeinComponent implements OnInit {
  webtitle = 'Admin Allgemein';

  constructor(private title: Title, private keycloakService: KeycloakService) {}

  allgemein: AllgemeinSettings = {
    botName: 'questMe',
    selectedIcon: {},
  };

  selectedIcon: string = '';
  condition = false;
  iconArray: any[] = [
    { name: 'Bot picture 01', condition: false },
    { name: 'Bot picture 02', condition: false },
    { name: 'Bot picture 03', condition: false },
    { name: 'Bot picture 04', condition: false },
    { name: 'Bot picture default', condition: false },
    { name: 'Bot picture fun', condition: false },
  ];

  chooseIcon(event: any) {
    //set all Icons of condition false
    this.iconArray.forEach((icon) => {
      icon.condition = false;
    });
    //console.log(this.iconArray);

    //set selected Icon to true
    let iconObj = this.iconArray.find((e) => e.name === event.target.alt);

    iconObj.condition = true;
    //choosen icon copy datamodel
    this.allgemein.selectedIcon = iconObj;
    //console.log(this.allgemein.selectedIcon);
  }

  ngOnInit(): void {
    this.title.setTitle(this.webtitle);
  }
  logout() {
    this.keycloakService.logout('http://localhost:4200');
  }
}
