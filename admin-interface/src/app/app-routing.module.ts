import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AllgemeinInterfaceComponent } from './admin-interface/allgemein-interface/allgemein-interface.component';
import { InfopageComponent } from './admin-interface/infopage/infopage.component';

const routes: Routes = [{path: 'admin-interface/allgemein-interface', component: AllgemeinInterfaceComponent},
{path: 'admin-interface/infopage', component: InfopageComponent}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
