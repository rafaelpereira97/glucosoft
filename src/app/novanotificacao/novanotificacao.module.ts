import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovanotificacaoPageRoutingModule } from './novanotificacao-routing.module';

import { NovanotificacaoPage } from './novanotificacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovanotificacaoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NovanotificacaoPage]
})
export class NovanotificacaoPageModule {}
