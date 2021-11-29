import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-infopage',
  templateUrl: './infopage.component.html',
  styleUrls: ['./infopage.component.scss']
})
export class InfopageComponent implements OnInit {

  constructor(private keycloakService: KeycloakService) { }

  ngOnInit(): void {
  }
  logout() {
    this.keycloakService.logout('http://localhost:4200');
  }
}
