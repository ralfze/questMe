import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-infopage',
  templateUrl: './infopage.component.html',
  styleUrls: ['./infopage.component.scss']
})
export class InfopageComponent implements OnInit {

  constructor(private apiService: ApiService, private keycloakService: KeycloakService) { }
  // Info about the selected icon in allgemein
  selectedIcon = {
    name: '', src: ''
  };
  ngOnInit(): void {
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
