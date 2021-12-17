import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.scss']
})
export class AdminInterfaceComponent implements OnInit {
  webtitle = 'Admin Website';

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(this.webtitle);

  }

}
export class AdminInterface { }
