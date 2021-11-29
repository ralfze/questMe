import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';






@Component({
  selector: 'app-korpus',
  templateUrl: './korpus.component.html',
  styleUrls: ['./korpus.component.scss']
})
export class KorpusComponent implements OnInit {
  webtitle = 'Admin Korpus';

  titleC = 'Korpus-Liste';

  selected = 'basis';


  list: any[] = [];
  list2: any[] = [];
  addTask(item: string) {
    this.list.push({ id: this.list.length, name: item })
    console.warn(this.list);

  }
  removeTask(id: number) {
    console.warn(id)
    this.list = this.list.filter(item => item.id !== id);

  }

  addTask2(item2: string) {
    this.list2.push({ id: this.list2.length, name: item2 })
    console.warn(this.list2);

  }

  removeTask2(id: number) {
    console.warn(id)
    this.list2 = this.list2.filter(item2 => item2.id !== id);

  }



  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle(this.webtitle);
  }

}
