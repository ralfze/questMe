import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfopageComponent } from './infopage.component';

describe('InfopageComponent', () => {
  let component: InfopageComponent;
  let fixture: ComponentFixture<InfopageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfopageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
