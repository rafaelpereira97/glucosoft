import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovaMedicaoPageRoutingModule } from './nova-medicao-routing.module';

import { NovaMedicaoPage } from './nova-medicao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovaMedicaoPageRoutingModule
  ],
  declarations: [NovaMedicaoPage]
})
export class NovaMedicaoPageModule {}
