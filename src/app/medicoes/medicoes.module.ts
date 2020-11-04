import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicoesPageRoutingModule } from './medicoes-routing.module';

import { MedicoesPage } from './medicoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicoesPageRoutingModule
  ],
  declarations: [MedicoesPage]
})
export class MedicoesPageModule {}
