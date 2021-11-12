import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AllgemeinInterfaceComponent } from './allgemein-interface/allgemein-interface.component';



@NgModule({
  declarations: [
    AppComponent,
    AllgemeinInterfaceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    RouterModule.forRoot([
      {path: 'allgemeininterface', component: AllgemeinInterfaceComponent},
      {path: 'app-root', component: AppComponent},
    ]),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

