import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {IonicStorageModule} from '@ionic/storage';
import {WizardguardGuard} from './guards/wizardguard.guard';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [WizardguardGuard]
  },
  {
    path: 'homepage',
    loadChildren: () => import('./homepage/homepage.module').then( m => m.HomepagePageModule)
  },
  {
    path: 'medicoes',
    loadChildren: () => import('./medicoes/medicoes.module').then( m => m.MedicoesPageModule)
  },
  {
    path: 'nova-medicao',
    loadChildren: () => import('./nova-medicao/nova-medicao.module').then( m => m.NovaMedicaoPageModule)
  },
  {
    path: 'notificacao',
    loadChildren: () => import('./novanotificacao/novanotificacao.module').then( m => m.NovanotificacaoPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./wizard/wizard.module').then( m => m.WizardPageModule),
    canActivate: [WizardguardGuard]
  },
  {
    path: 'novanotificacao',
    loadChildren: () => import('./novanotificacao/novanotificacao.module').then( m => m.NovanotificacaoPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    IonicStorageModule.forRoot(),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
