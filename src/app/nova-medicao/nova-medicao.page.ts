import { Component, OnInit } from '@angular/core';
import {DbServiceService} from '../DB/db-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-nova-medicao',
  templateUrl: './nova-medicao.page.html',
  styleUrls: ['./nova-medicao.page.scss'],
})
export class NovaMedicaoPage implements OnInit {
    date: any;
    MedicoesFrom: FormGroup;
  constructor(private dbservice: DbServiceService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.MedicoesFrom = this.createMedicoesFrom();
  }

  createMedicoesFrom(): FormGroup
  {
    return this.formBuilder.group({
      Glucose: [0, Validators.required],
      Moment: ['' , Validators.required],
      DateAdd: [new Date().toISOString(), Validators.required],
      Kcal: [0], // Este valor vem da api da saude
      Notes: [''],

    });
  }
  InsereRegisto(){
    const Data = this.MedicoesFrom.getRawValue();
    const Resultado = this.dbservice.InsertRegisto(Data);
    console.log('RESULTADINHOOOOOO', Resultado);
  }

}
