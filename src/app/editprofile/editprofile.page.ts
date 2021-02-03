import { Component, OnInit } from '@angular/core';
import {DbServiceService} from '../DB/db-service.service';
import {SQLiteObject} from '@ionic-native/sqlite/ngx';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
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
  constructor(private db: DbServiceService,public navCtrl: NavController,public activatedRoute: ActivatedRoute) {
    this.db.openDatabaseConnection().then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM User WHERE Id = 1', []).then((data) => {
        const user = data.rows.item(0);
        this.nome = user.Nome;
        this.idade = user.Idade;
        this.genero = user.Genero;
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

  ngOnInit() {
  }

  guardar(){
    this.db.openDatabaseConnection().then((db: SQLiteObject) => {
      db.executeSql('UPDATE User SET Id = ?, Nome = ?, Idade = ?, Genero = ?, Peso = ?, Altura = ?, TipoDiabetes = ?, IC = ?, ISF = ?, Target = ? WHERE Id = 1', [1,this.nome,this.idade,this.genero,this.peso,this.altura,this.tipoDiabetes,this.IC,this.ISF,this.Target]).then((data) => {

        this.navCtrl.navigateBack('tabs/tabs/tab3').then(() => {
          window.location.reload();
        });

        }, (e) => {
        console.log('Erro ao criar utilizador: ' + JSON.stringify(e));
      });
    });
  }

}
