import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LexikaComponent } from './lexika.component';

describe('LexikaComponent', () => {
  let component: LexikaComponent;
  let fixture: ComponentFixture<LexikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LexikaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LexikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
