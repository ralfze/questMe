import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllgemeinInterfaceComponent } from './allgemein-interface.component';

describe('AllgemeinInterfaceComponent', () => {
  let component: AllgemeinInterfaceComponent;
  let fixture: ComponentFixture<AllgemeinInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllgemeinInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllgemeinInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
