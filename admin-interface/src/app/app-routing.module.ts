import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GeneralComponent } from './admin-interface/general/general.component';
import { InfopageComponent } from './admin-interface/infopage/infopage.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { CorpusComponent } from './admin-interface/corpus/corpus.component';
import { SettingsComponent } from './admin-interface/settingspage/settings.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './utility/app.guard';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'admin-interface/general', component: GeneralComponent, canActivate:[AuthGuard], data: {roles: ['admin']}},
  { path: 'admin-interface/infopage', component: InfopageComponent, canActivate:[AuthGuard], data: {roles: ['admin']}},
  { path: 'admin-interface', component: AdminInterfaceComponent},
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  { path: 'admin-interface/corpus', component: CorpusComponent, canActivate:[AuthGuard], data: {roles: ['admin']}},
  { path: 'admin-interface/settings', component: SettingsComponent, canActivate:[AuthGuard], data: {roles: ['admin']}},
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
