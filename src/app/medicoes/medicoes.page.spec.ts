import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicoesPage } from './medicoes.page';

describe('MedicoesPage', () => {
  let component: MedicoesPage;
  let fixture: ComponentFixture<MedicoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
