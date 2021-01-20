import { Component, OnInit } from '@angular/core';
import {DbServiceService} from '../DB/db-service.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DatePipe } from '@angular/common';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { ToastController } from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';
import { Health } from '@ionic-native/health/ngx';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
    providers: [DatePipe]

})
export class HomepagePage implements OnInit {

    max = 300;
    current = 0;
    color = '';
    Segment: any;
    registos: Array<any>;

  constructor(private db: DbServiceService,
              public datepipe: DatePipe ,
              private nfc: NFC, private ndef: Ndef,
              public toastController: ToastController,
              private router: Router,
              private health: Health) {
      this.nfc.addTagDiscoveredListener(() => {

      }, (err) => {
          console.log('error attaching ndef listener', err);
      }).subscribe((event) => {
          const navigationExtras: NavigationExtras = {
              queryParams: {
                  glucose: JSON.stringify(70)
              }
          };

          this.router.navigate(['/nova-medicao'], navigationExtras);
      });

   /*   this.health.isAvailable()
          .then((available: boolean) => {
              console.log(available);
              this.health.requestAuthorization([
                  'distance', 'nutrition',
                  {
                      read: ['steps'],
                      write: ['height', 'weight']
                  }
              ])
                  .then(res => console.log(res))
                  .catch(e => console.log(e));
          })
          .catch(e => console.log(e));*/
      this.getLastRegisto();
      this.getTodayRegistos(this.datepipe.transform(new Date(), 'yyyy-MM-dd'));
  }

    ngOnInit() {

    }


    async presentToast(texto) {
        const toast = await this.toastController.create({
            message: texto,
            duration: 2000
        });
        toast.present();
    }

    segmentChanged(ev: any) {
        console.log('Segment changed', ev);
        console.log(ev.detail.value);
        switch (ev.detail.value){
            case'hoje':
                const Result = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
                this.getTodayRegistos(Result);

                break;
            case'ontem':
                const Ontem = this.datepipe.transform(new Date().setDate(new Date().getDate() - 1), 'yyyy-MM-dd');
                console.log(Ontem);
                this.getTodayRegistos(Ontem);
                break;
            case'mes':
                const date = new Date();
                const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                this.getAllRegistos(firstDay.toISOString(), lastDay.toISOString());
                console.log('Segment changed', ev);
                break;
            case'ano':
                const Date1 = new Date();
                const firstDayYear = new Date(Date1.getFullYear(), 0, 1);
                const lastDayYear = new Date(Date1.getFullYear(), 11, 31);
                this.getAllRegistos(firstDayYear.toISOString(), lastDayYear.toISOString());
                break;
        }
    }
    getAllRegistos(query, query2){
          this.db.openDatabaseConnection().then((db: SQLiteObject) => {
              db.executeSql('SELECT * FROM Registos where DateAdd BETWEEN ? AND ? ORDER BY DateAdd DESC', [query, query2]).then((data) => {
                  this.registos = [];
                  if (data.rows.length > 0) {
                      for (let i = 0; i < data.rows.length; i++) {
                          this.registos.push(data.rows.item(i));
                      }
                  }
              }, (e) => {
                  console.log('Error: ' + JSON.stringify(e));
              });
          });
}
    getTodayRegistos(date){
         console.log(date);
         this.db.openDatabaseConnection().then((db: SQLiteObject) => {
            db.executeSql('SELECT * FROM Registos where Data = ? ORDER BY DateAdd DESC', [date]).then((data) => {
                this.registos = [];
                if (data.rows.length > 0) {
                    for (let i = 0; i < data.rows.length; i++) {
                        this.registos.push(data.rows.item(i));
                    }
                }
            }, (e) => {
                console.log('Error: ' + JSON.stringify(e));
            });
        });
    }
    getLastRegisto(){
        this.db.openDatabaseConnection().then((db: SQLiteObject) => {
            db.executeSql('SELECT * FROM Registos ORDER BY DateAdd DESC LIMIT 1', []).then((data) => {
                if (data.rows.length > 0){
                    this.current = data.rows.item(0).Glucose;
                }
                if (this.current <= 126){
                    this.color = '#04b50a';
                }else if (this.current >= 127 && this.current < 226) {
                    this.color = '#fabd05';
                }else{
                    this.color = '#c42902';
                }
            }, (e) => {
                console.log('Error: ' + JSON.stringify(e));
            });
        });
    }
}

