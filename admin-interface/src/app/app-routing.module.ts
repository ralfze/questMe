import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AllgemeinInterfaceComponent } from './allgemein-interface/allgemein-interface.component';
import { Routes, RouterModule, RouterOutlet } from '@angular/router';

const routes: Routes = [{ path: 'app-root', component: AppComponent },
{ path: 'allgemein-interface', component: AllgemeinInterfaceComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),
  RouterOutlet],
  exports: [RouterModule]
})
export class AppRoutingModule { }
