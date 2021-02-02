import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

    private database: SQLiteObject;

    constructor(private sqlite: SQLite) {
      this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {


  db.executeSql('create table Registos (Id INTEGER PRIMARY KEY  Autoincrement ,Glucose FLOAT, Moment TEXT, DateAdd DATETIME, DateMode DATETIME , Kcal FLOAT , NOTES TEXT,Data TEXT)', [])
              .then(() => console.log('Executed SQL'))
              .catch(e => console.log(e));


  db.executeSql('create table User (Id INTEGER PRIMARY KEY  Autoincrement ,Nome TEXT, Idade INTEGER, Genero TEXT, Peso TEXT , Altura TEXT , TipoDiabetes TEXT, Foto Text,IC TEXT, ISF TEXT, Target TEXT)', [])
              .then(() => console.log('Executed SQL'))
              .catch(e => console.log(e));

      })
      .catch(e => console.log(e));
  }


    InsertRegisto(Data: any): boolean{
      const resultado = false;
      this.sqlite.create({
            name: 'data.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO Registos (Glucose,Moment,DateAdd,DateMode,Kcal,NOTES,Data) VALUES (?,?,?,?,?,?,?)', [Data.Glucose, Data.Moment, Data.DateAdd, Data.DateAdd, Data.Kcal, Data.Notes, Data.Data])
            .then(() => console.log('[SUCESS] Medicao Inserida com Sucesso!'))
            .catch(e => console.log(e));
    })
.catch(e => console.log(e));
      return  resultado;

    }

    getRegistos(){
        return this.database.executeSql('SELECT * FROM Registos');
    }

    openDatabaseConnection(){
        return this.sqlite.create({
            name: 'data.db',
            location: 'default'
        });
    }
}
