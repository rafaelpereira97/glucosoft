import { Component, OnInit } from '@angular/core';
import {DbServiceService} from '../DB/db-service.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DatePipe } from '@angular/common';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { ToastController } from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';


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
    registos: Array<any>;

  constructor(private db: DbServiceService, public datepipe: DatePipe,private nfc: NFC, private ndef: Ndef,public toastController: ToastController,private router: Router) {
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
                const hoje = new Date().getDate();
                console.log('Segment changed', new Date(2021,0, 4).toISOString());
                this.getAllRegistos(new Date(2021, 0,4).toISOString(), new Date(2021, 0, 4).toISOString());

                break;
            case'ontem':
                const ontem = new Date().getDate() - 1;
                this.getAllRegistos(ontem, ontem);
                console.log(ontem);
                break;
            case'mes':
                const date = new Date();
                const IMes = new Date(date.getFullYear(), date.getMonth(), 1);
                const FMes = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                this.getAllRegistos(new Date(2021, 0,1).toISOString(), new Date(2021, 0,31).toISOString());
                console.log('Segment changed', ev);
                break;
            case'ano':
                const Year = new Date(new Date().getFullYear(), 0, 1);
                console.log('Segment changed', ev);
                break;
        }
    }
 /* ionViewWillEnter(){
      this.getAllRegistos('', '');
  }*/

     getAllRegistos(query, query2){
          this.db.openDatabaseConnection().then((db: SQLiteObject) => {
              db.executeSql('SELECT * FROM Registos where DateAdd BETWEEN ? AND ? ORDER BY DateAdd DESC', [query, query2]).then((data) => {
                  this.registos = [];
                  if (data.rows.length > 0) {
                      for (let i = 0; i < data.rows.length; i++) {
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
                  console.log('Error: ' + JSON.stringify(e));
              });
          });
}
}

