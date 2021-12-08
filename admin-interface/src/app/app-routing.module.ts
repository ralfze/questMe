import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AllgemeinComponent } from './admin-interface/allgemein/allgemein.component';
import { InfopageComponent } from './admin-interface/infopage/infopage.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { CorpusComponent } from './admin-interface/corpus/corpus.component';
import { EinstellungenComponent } from './admin-interface/einstellungen/einstellungen.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './utility/app.guard';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'admin-interface/allgemein', component: AllgemeinComponent ,canActivate:[AuthGuard]},
  { path: 'admin-interface/infopage', component: InfopageComponent ,canActivate:[AuthGuard]},
  { path: 'admin-interface', component: AdminInterfaceComponent },
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  { path: 'admin-interface/corpus', component: CorpusComponent ,canActivate:[AuthGuard]},
  { path: 'admin-interface/einstellungen', component: EinstellungenComponent ,canActivate:[AuthGuard]},
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
