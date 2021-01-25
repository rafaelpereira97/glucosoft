import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-novanotificacao',
  templateUrl: './novanotificacao.page.html',
  styleUrls: ['./novanotificacao.page.scss'],
})
export class NovanotificacaoPage implements OnInit {
  NotificaoForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private localNotifications: LocalNotifications,
              public navCtrl: NavController) { }

  ngOnInit() {
    this.NotificaoForm = this.createNotificaoFrom();

  }
  addNotificacao(){
    const Data = this.NotificaoForm.getRawValue();
    this.localNotifications.schedule({
      id: Math.floor(Math.random() * 100000000),
      title: Data.TituloNoti,
      text: Data.TextoNofi,
      trigger: {at: new Date(new Date(Data.DateAdd))},
      sound: null,
      vibrate: true
    });
    this.navCtrl.navigateBack('tabs/tabs/tab2').then(() => {
      window.location.reload();
    });
  }
  createNotificaoFrom(): FormGroup
  {
    return this.formBuilder.group({
      TituloNoti: ['', Validators.required],
      TextoNofi: ['' , Validators.required],
      DateAdd: [new Date(), Validators.required],

    });
  }
}
