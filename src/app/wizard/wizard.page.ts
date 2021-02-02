import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage';
import {DbServiceService} from '../DB/db-service.service';
import {SQLiteObject} from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.page.html',
  styleUrls: ['./wizard.page.scss'],
})
export class WizardPage implements OnInit {
  nome;
  idade;
  genero;
  peso;
  altura;
  tipo_diabetes;
  IC;
  ISF;
  Target;

  constructor(private router: Router, private storage: Storage, private db: DbServiceService) { }

  ngOnInit() {
  }
  FinishWizard(): void {
    this.storage.set('anserdwizard', false);
    this.saveUser();
    this.router.navigate(['/tabs/tabs/homepage']);
  }
  saveUser(){
    this.db.openDatabaseConnection().then((db: SQLiteObject) => {
      // tslint:disable-next-line:max-line-length
      db.executeSql('INSERT INTO User (Id,Nome,Idade,Genero,Peso,Altura,TipoDiabetes,IC,ISF,Target) VALUES (?,?,?,?,?,?,?,?,?,?)', [1, this.nome, this.idade, this.genero, this.peso, this.altura, this.tipo_diabetes, this.IC, this.ISF, this.Target]).then((data) => {
        console.log('DATAAA: ' + data);
      }, (e) => {
        console.log('Erro ao criar utilizador: ' + JSON.stringify(e));
      });
    });
  }
}
