import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EinstellungenComponent } from './einstellungen.component';

describe('EinstellungenComponent', () => {
  let component: EinstellungenComponent;
  let fixture: ComponentFixture<EinstellungenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EinstellungenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EinstellungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
