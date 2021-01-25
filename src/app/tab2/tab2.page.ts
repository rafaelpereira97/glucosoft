import { Component } from '@angular/core';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private localNotifications: LocalNotifications) {}

  ngOnInit() {
    console.log('Teste');
    this.localNotifications.schedule([{
      id: 1,
      text: 'Multi ILocalNotification 1',
      icon: 'http://example.com/icon.png'
    }, {
      id: 2,
      title: 'Local ILocalNotification Example',
      text: 'Multi ILocalNotification 2',
      icon: 'http://example.com/icon.png'
    }]);

  }

}
