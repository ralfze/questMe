import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-einstellungen',
  templateUrl: './einstellungen.component.html',
  styleUrls: ['./einstellungen.component.scss']
})
export class EinstellungenComponent implements OnInit {
  webtitle = 'Admin Einstellungen';

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredUser: Observable<string[]>;
  users: string[] = ['Basis'];
  allusers: string[] = ['Hochschule', 'Basis', 'Interna'];

  @ViewChild('userInput')
  userInput!: ElementRef<HTMLInputElement>;

  constructor(private title: Title, private keycloakService: KeycloakService) {
    this.filteredUser = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => (user ? this._filter(user) : this.allusers.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our user
    if (value) {
      this.users.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.userCtrl.setValue(null);
  }

  remove(user: string): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.users.push(event.option.viewValue);
    this.userInput.nativeElement.value = '';
    this.userCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allusers.filter(user => user.toLowerCase().includes(filterValue));
  }




  ngOnInit(): void {
    this.title.setTitle(this.webtitle);
  }
  logout() {
    this.keycloakService.logout('http://localhost:4200');
  }
}
