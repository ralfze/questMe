import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-allgemein',
  templateUrl: './allgemein.component.html',
  styleUrls: ['./allgemein.component.scss']
})
export class AllgemeinComponent implements OnInit {
  webtitle = 'Admin Allgemein';
  constructor(private title: Title, private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.title.setTitle(this.webtitle);
  }
  logout() {
    this.keycloakService.logout('http://localhost:4200');
  }

}

