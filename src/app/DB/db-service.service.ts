import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(private sqlite: SQLite) {
      this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {


  db.executeSql('create table Registos (Id INTEGER PRIMARY KEY  Autoincrement ,Glucose FLOAT, Moment TEXT, DateAdd DATETIME, DateMode DATETIME , Kcal FLOAT , NOTES TEXT)', [])
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
        db.executeSql('', [])
            .then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));


    })
.catch(e => console.log(e));
      return  resultado;

    }

}
