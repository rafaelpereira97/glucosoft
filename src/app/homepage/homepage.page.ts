import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DbServiceService} from '../DB/db-service.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { DatePipe } from '@angular/common';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { ToastController } from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';
import { Health } from '@ionic-native/health/ngx';
import { Chart } from 'chart.js';

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
    @ViewChild('barChart', { static: true }) barChart: ElementRef;
    @ViewChild('lineCanvas', { static: true }) lineCanvas: ElementRef;
    @ViewChild('doughnutCanvas', { static: true }) doughnutCanvas: ElementRef;
    bars: any;
    colorArray: any;
    lineChart: any;
    doughnutChart: any;

    constructor(private db: DbServiceService,
                public datepipe: DatePipe ,
                private nfc: NFC, private ndef: Ndef,
                public toastController: ToastController,
                private router: Router,
                private health: Health,
                ) {
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

      this.getLastRegisto();
      this.getTodayRegistos(this.datepipe.transform(new Date(), 'yyyy-MM-dd'));
  }

    ngOnInit() {
        this.doughnutChartMethod();
        this.lineChartMethod();
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
    createBarChart() {
        this.bars = new Chart(this.barChart.nativeElement, {
            type: 'bar',
            data: {
                labels: this.getDaysInMonth(1,2021),
                datasets: [{
                    label: 'Viewers in millions',
                    data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
                    backgroundColor: 'rgb(38, 194, 129)',
                    borderColor: 'rgb(38, 194, 129)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
    getDaysInMonth(month, year) {
        const date = new Date(year, month, 1);
        const days = [];
        let count = 0;
        while (date.getMonth() === month) {
            count += 1;
            days.push(count);
            date.setDate(date.getDate() + 1);
        }
        console.log(days);
        return days;
    }
    lineChartMethod() {
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: [
                    {
                        label: 'Media de Medição por Mês',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [90, 110, 100, 81, 140, 89, 130, 90, 100, 80, 130, 100],
                        spanGaps: false,
                    }
                ]
            }
        });
    }
    doughnutChartMethod() {
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
            type: 'doughnut',
            data: {
                labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta','Sabado','Domingo'],
                datasets: [{
                    label: '# of Votes',
                    data: [100, 120, 130, 70, 130,120,140],
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 134, 13, 0.2)',
                        'rgba(5, 252, 100, 0.2)',
                    ],
                    hoverBackgroundColor: [
                        '#FFCE56',
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#FF6384',
                        '#ffcd9c',
                        '#9cffc2',
                    ]
                }]
            }
        });
    }
}

