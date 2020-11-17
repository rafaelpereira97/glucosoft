import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WizardPage } from './wizard.page';

describe('WizardPage', () => {
  let component: WizardPage;
  let fixture: ComponentFixture<WizardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WizardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
