import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DbServiceService} from '../DB/db-service.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  CalculaForm: FormGroup;
  glucose = 0;
  TotalA = '0';
  Last: any;
  User: any;
  constructor(private formBuilder: FormBuilder, private db: DbServiceService) {this.getLastRegisto();
                                                                               this.getInfoUser(); }
  ngOnInit(){

    this.CalculaForm = this.createCalculaFrom();
  }
  createCalculaFrom(): FormGroup
  {
    return this.formBuilder.group({

      Carbohydrates: ['' , Validators.required],
      Glucose: [this.Last, Validators.required],

  });
  }
  CalculaInsulina(){
    const Calcula = this.CalculaForm.getRawValue();
    this.TotalA = ((Calcula.Carbohydrates / this.User.IC) + ((Calcula.Glucose - this.User.Target) / this.User.ISF)).toFixed(2);
  }
  getLastRegisto(){
    this.db.openDatabaseConnection().then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM Registos ORDER BY DateAdd DESC LIMIT 1', []).then((data) => {
        if (data.rows.length > 0){
          this.Last = data.rows.item(0).Glucose;
          console.log(this.Last);
        }
      }, (e) => {
        console.log('Error: ' + JSON.stringify(e));
      });
    });
  }
  getInfoUser(){
  this.db.openDatabaseConnection().then((db: SQLiteObject) => {
    db.executeSql('SELECT * FROM User WHERE Id = 1', []).then((data) => {
      this.User = data.rows.item(0);
    }, (e) => {
      console.log('Erro ao criar utilizador: ' + JSON.stringify(e));
    });
  });
  }

}
