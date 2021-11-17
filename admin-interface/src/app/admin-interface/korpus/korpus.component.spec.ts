import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorpusComponent } from './korpus.component';

describe('KorpusComponent', () => {
  let component: KorpusComponent;
  let fixture: ComponentFixture<KorpusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KorpusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KorpusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
