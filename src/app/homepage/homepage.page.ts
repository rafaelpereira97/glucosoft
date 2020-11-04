import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

    max = 500;
    current = 126;
    color = '';

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

      const LastValue = this.medicoes[this.medicoes.length - 1 ];
      this.current = LastValue.ValorMedicao;
      if (this.current <= 126){
        this.color = '#04b50a';
    }else if (this.current >= 127 && this.current < 226) {
        this.color = '#fabd05';
    }else{
        this.color = '#c42902';
    }
  }

}

