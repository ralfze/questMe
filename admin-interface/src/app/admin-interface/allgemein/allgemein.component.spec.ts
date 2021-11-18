import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllgemeinComponent } from './allgemein.component';

describe('AllgemeinInterfaceComponent', () => {
  let component: AllgemeinComponent;
  let fixture: ComponentFixture<AllgemeinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllgemeinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllgemeinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
