import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// REST API
import { HttpClientModule } from '@angular/common/http';
// END REST API

import { AppComponent } from './app.component';
import { AllgemeinComponent } from './admin-interface/allgemein/allgemein.component';
import { InfopageComponent } from './admin-interface/infopage/infopage.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { CorpusComponent } from './admin-interface/corpus/corpus.component';
import { EinstellungenComponent } from './admin-interface/einstellungen/einstellungen.component';
import { ChatComponent as ChatComponent } from './chat/chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgxFlickingModule } from '@egjs/ngx-flicking';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SocketService } from './chat/socket.service';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './utility/app.init';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
// Tree Example
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { IntentCard } from './admin-interface/corpus/intent/intent-card.component';
import { IntentArray } from './admin-interface/corpus/intent-array/intent-array.component';
import { IntentDialogComponent } from './admin-interface/corpus/intent-array/intent-dialog/intent-dialog.component';
// Intent Card Dialog
import { MatDialogModule } from '@angular/material/dialog'
import { MatTooltipModule } from '@angular/material/tooltip'

@NgModule({
  declarations: [
    AppComponent,
    AllgemeinComponent,
    InfopageComponent,
    AdminInterfaceComponent,
    CorpusComponent,
    EinstellungenComponent,
    ChatComponent,
    IntentCard,
    IntentArray,
    IntentDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    AppRoutingModule,
    NgxFlickingModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTreeModule, MatCheckboxModule,
    MatChipsModule,
    MatListModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    KeycloakAngularModule,
    HttpClientModule
  ],
  providers: [SocketService, {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

