import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AllgemeinComponent } from './admin-interface/allgemein/allgemein.component';
import { InfopageComponent } from './admin-interface/infopage/infopage.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { KorpusComponent } from './admin-interface/korpus/korpus.component';
import { EinstellungenComponent } from './admin-interface/einstellungen/einstellungen.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'admin-interface/allgemein', component: AllgemeinComponent },
  { path: 'admin-interface/infopage', component: InfopageComponent },
  { path: 'admin-interface', component: AdminInterfaceComponent },
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  { path: 'admin-interface/korpus', component: KorpusComponent },
  { path: 'admin-interface/einstellungen', component: EinstellungenComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
