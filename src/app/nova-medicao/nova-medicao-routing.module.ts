import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovaMedicaoPage } from './nova-medicao.page';

const routes: Routes = [
  {
    path: '',
    component: NovaMedicaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovaMedicaoPageRoutingModule {}
