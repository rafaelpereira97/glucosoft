import { Component, OnInit } from '@angular/core';
import {DbServiceService} from "../DB/db-service.service";

@Component({
  selector: 'app-nova-medicao',
  templateUrl: './nova-medicao.page.html',
  styleUrls: ['./nova-medicao.page.scss'],
})
export class NovaMedicaoPage implements OnInit {
    date: any;

  constructor(private dbservice: DbServiceService) { }

  ngOnInit() {
    this.dbservice.InsertRegisto();
  }

}
