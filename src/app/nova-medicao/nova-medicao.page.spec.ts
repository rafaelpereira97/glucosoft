import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NovaMedicaoPage } from './nova-medicao.page';

describe('NovaMedicaoPage', () => {
  let component: NovaMedicaoPage;
  let fixture: ComponentFixture<NovaMedicaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaMedicaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NovaMedicaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
