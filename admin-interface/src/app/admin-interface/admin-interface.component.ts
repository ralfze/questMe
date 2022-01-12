import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GeneralSettings } from './general/general';
import { ApiService } from './api.service';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.scss']
})
export class AdminInterfaceComponent implements OnInit {
  webtitle = 'Admin Website Infopage';

  constructor(private title: Title, private apiService: ApiService) { }

  ngOnInit(): void {
    this.title.setTitle(this.webtitle);
    this.refreshAllgemein();

  }
  // DataModel of Allgmein Website
  generalData: GeneralSettings = {
    botName: '',
    selectedIcon: { name: '', condition: false, src: '' }
  };
  /// REST API
  /**
   * Gets the AllgemeinData
   */
  refreshAllgemein() {
    // Retrieve AllgemeinData
    this.apiService.getGeneral().subscribe(data => {
      console.log(data);
      // Retrieve the generalData
      this.generalData = data;
    })
  }
  // END REST API
}
export class AdminInterface { }
