import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-allgemein',
  templateUrl: './allgemein.component.html',
  styleUrls: ['./allgemein.component.scss']
})
export class AllgemeinComponent implements OnInit {
  webtitle = 'Admin Allgemein';
  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(this.webtitle);
  }

}

