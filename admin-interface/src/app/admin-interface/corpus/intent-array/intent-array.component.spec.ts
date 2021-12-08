import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentArray } from './intent-array.component';

describe('IntentArray', () => {
  let component: IntentArray;
  let fixture: ComponentFixture<IntentArray>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntentArray ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentArray);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
