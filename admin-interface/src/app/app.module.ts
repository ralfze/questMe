import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppComponent } from './app.component';
import { AllgemeinComponent} from './admin-interface/allgemein/allgemein.component';
import { InfopageComponent } from './admin-interface/infopage/infopage.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { KorpusComponent } from './admin-interface/korpus/korpus.component';
import { EinstellungenComponent } from './admin-interface/einstellungen/einstellungen.component';
import { ChatfensterComponent } from './chatfenster/chatfenster.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgxFlickingModule } from '@egjs/ngx-flicking';
import {MatInputModule} from '@angular/material/input';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    AllgemeinComponent,
    InfopageComponent,
    AdminInterfaceComponent,
    KorpusComponent,
    EinstellungenComponent,
    ChatfensterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    AppRoutingModule,
    NgxFlickingModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

