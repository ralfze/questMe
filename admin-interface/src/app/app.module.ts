import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { AllgemeinInterfaceComponent } from './admin-interface/allgemein-interface/allgemein-interface.component';
import { InfopageComponent } from './admin-interface/infopage/infopage.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { KorpusComponent } from './admin-interface/korpus/korpus.component';




@NgModule({
  declarations: [
    AppComponent,
    AllgemeinInterfaceComponent,
    InfopageComponent,
    AdminInterfaceComponent,
    KorpusComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    AppRoutingModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

