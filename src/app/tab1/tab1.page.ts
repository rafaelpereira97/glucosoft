import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  CalculaForm: FormGroup;
  glucose = 0;
  TotalA  = 0;
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(){
    this.CalculaForm = this.createCalculaFrom();
  }
  createCalculaFrom(): FormGroup
  {
    return this.formBuilder.group({

      PercentagemR: ['' , Validators.required],
      TamanhoDoFrasco: ['', Validators.required],

  });
  }
  CalculaInsulina(){
    const Calcula = this.CalculaForm.getRawValue();
    this.TotalA =  (Calcula.PercentagemR / Calcula.TamanhoDoFrasco);
    console.log(this.TotalA);


  }

}
