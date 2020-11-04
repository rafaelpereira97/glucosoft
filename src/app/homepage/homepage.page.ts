import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  medicoes: [{ Data: Date; Id: number; ValorMedicao: number }, { Data: Date; Id: number; ValorMedicao: number }, { Data: Date; Id: number; ValorMedicao: number }, { Data: Date; Id: number; ValorMedicao: number }, { Data: Date; Id: number; ValorMedicao: number }, { Data: Date; Id: number; ValorMedicao: number }, { Data: Date; Id: number; ValorMedicao: number }] =
      [
        {
          Id: 1,
          ValorMedicao: 127,
          Data: new Date(),
},
        {
          Id: 2,
          ValorMedicao: 122,
          Data: new Date(),
        },
        {
          Id: 3,
          ValorMedicao: 90,
          Data: new Date(),
        },
        {
          Id: 4,
          ValorMedicao: 180,
          Data: new Date(),
        },
        {
          Id: 4,
          ValorMedicao: 190,
          Data: new Date(),
        },
          {
              Id: 5,
              ValorMedicao: 190,
              Data: new Date(),
          },
          {
              Id: 6,
              ValorMedicao: 190,
              Data: new Date(),
          },

];
  constructor() { }

  ngOnInit() {
    console.log(this.medicoes);
  }

}

