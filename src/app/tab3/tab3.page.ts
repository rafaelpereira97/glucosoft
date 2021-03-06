import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {DbServiceService} from '../DB/db-service.service';
import {SQLiteObject} from '@ionic-native/sqlite/ngx';
import {Router} from '@angular/router';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  nome: string;
  idade: string;
  genero: string;
  peso: number;
  altura: number;
  tipoDiabetes: string;
  imc: number;
  IC:number;
  ISF:number;
  Target:number;

  constructor(private db: DbServiceService, private router: Router) {
    this.db.openDatabaseConnection().then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM User WHERE Id = 1', []).then((data) => {
        const user = data.rows.item(0);
        this.nome = user.Nome;
        this.idade = user.Idade;
        this.genero = user.Genero === 'm' ? 'Masculino' : 'Feminino';
        this.peso = user.Peso;
        this.altura = user.Altura;
        this.tipoDiabetes = user.TipoDiabetes;
        this.imc = Math.round((this.peso / (this.altura * this.altura)));
        this.IC = user.IC;
        this.ISF = user.ISF;
        this.Target = user.Target;
      }, (e) => {
        console.log('Erro ao criar utilizador: ' + JSON.stringify(e));
      });
    });
  }

  openEditProfilePage(){
    this.router.navigate(['/editprofile']);
  }


}
