import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.page.html',
  styleUrls: ['./wizard.page.scss'],
})
export class WizardPage implements OnInit {

  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() {
  }
  FinishWizard(): void {
    this.storage.set('anserdwizard', false);
    this.router.navigate(['/tabs/tabs/homepage']);
  }
}
