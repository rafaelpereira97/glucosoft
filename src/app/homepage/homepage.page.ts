import { Component, OnInit } from '@angular/core';
import {DbServiceService} from "../DB/db-service.service";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

    max = 500;
    current = 0;
    color = '';
    registos: Array<any>;

  constructor(private db: DbServiceService) {

  }

    ngOnInit() {

    }

  ionViewWillEnter(){
      this.getAllRegistos();
  }

     getAllRegistos(){
          this.db.openDatabaseConnection().then((db: SQLiteObject) => {
              db.executeSql("SELECT * FROM Registos ORDER BY DateAdd DESC", []).then((data) => {
                  this.registos = [];
                  if(data.rows.length > 0) {
                      for(let i = 0; i < data.rows.length; i++) {
                          this.registos.push(data.rows.item(i));
                      }
                  }
                  const LastValue = this.registos[0];

                  this.current = LastValue.Glucose;
                  if (this.current <= 126){
                      this.color = '#04b50a';
                  }else if (this.current >= 127 && this.current < 226) {
                      this.color = '#fabd05';
                  }else{
                      this.color = '#c42902';
                  }
              }, (e) => {
                  console.log("Error: " + JSON.stringify(e));
              });
          });
}
}

