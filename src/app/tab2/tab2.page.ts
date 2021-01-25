import { Component } from '@angular/core';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  Notificoes: any;
  constructor(private localNotifications: LocalNotifications, private router: Router) {}

  ngOnInit() {
  this.localNotifications.getAll().then((result) => {
       console.log(result);
       this.Notificoes = result;
       this.Notificoes.forEach(element => {
          console.log(new Date(element.trigger.at));
          element.trigger.at = new Date(element.trigger.at);
      });

    });
 }
  openNotificacao(){
    this.router.navigate(['/notificacao']);
  }
  CancelNotification(notification: any){
      console.log(notification);
      this.localNotifications.cancelAll().then(r =>  { this.localNotifications.getAll().then((result) => {
          console.log(r);
          this.Notificoes = result;
          this.Notificoes.forEach(element => {
              element.trigger.at = new Date(element.trigger.at);
          });

      });
      });

  }

}
