import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpusComponent } from './corpus.component';

describe('KorpusComponent', () => {
  let component: CorpusComponent;
  let fixture: ComponentFixture<CorpusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorpusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
