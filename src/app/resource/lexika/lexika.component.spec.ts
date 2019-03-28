import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LexikaComponent } from './lexika.component';
import { KuiViewerModule } from '@knora/viewer';
import { RouterTestingModule } from '@angular/router/testing';
import { KuiCoreConfigToken, KuiCoreConfig } from '@knora/core';

describe('LexikaComponent', () => {
  let component: LexikaComponent;
  let fixture: ComponentFixture<LexikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KuiViewerModule, RouterTestingModule],
      declarations: [LexikaComponent],
      providers: [
        {
          provide: KuiCoreConfigToken,
          useValue: KuiCoreConfig
        }
      ]
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
