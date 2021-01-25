import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovanotificacaoPage } from './novanotificacao.page';

const routes: Routes = [
  {
    path: '',
    component: NovanotificacaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovanotificacaoPageRoutingModule {}
