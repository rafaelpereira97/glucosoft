import { Component, OnInit } from '@angular/core';
import {DbServiceService} from '../DB/db-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController} from "@ionic/angular";
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-nova-medicao',
  templateUrl: './nova-medicao.page.html',
  styleUrls: ['./nova-medicao.page.scss'],
  providers: [DatePipe]
})
export class NovaMedicaoPage implements OnInit {
    date: any;
    MedicoesFrom: FormGroup;
    glucose = 0;

  constructor(private dbservice: DbServiceService, private formBuilder: FormBuilder, public navCtrl: NavController,public activatedRoute: ActivatedRoute,
              private router: Router, private datepipe: DatePipe) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.glucose) {
        this.glucose = JSON.parse(params.glucose);
        this.MedicoesFrom = this.createMedicoesFrom();
      }
      this.MedicoesFrom = this.createMedicoesFrom();
    });
  }

  createMedicoesFrom(): FormGroup
  {
    return this.formBuilder.group({
      Glucose: [this.glucose, Validators.required],
      Moment: ['' , Validators.required],
      DateAdd: [new Date().toISOString(), Validators.required],
      Kcal: [0], // Este valor vem da api da saude
      Notes: [''],
     });
  }
  InsereRegisto(){
    const Data = this.MedicoesFrom.getRawValue();
    Data.Data = this.datepipe.transform(Data.DateAdd, 'yyyy-MM-dd');
    this.dbservice.InsertRegisto(Data);

    this.navCtrl.navigateBack('tabs/tabs/homepage').then(() => {
      window.location.reload();
    });
  }

}
