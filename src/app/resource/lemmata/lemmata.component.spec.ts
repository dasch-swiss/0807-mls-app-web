import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LemmataComponent } from './lemmata.component';
import { KuiViewerModule } from '@knora/viewer';
import { RouterTestingModule } from '@angular/router/testing';
import { KuiCoreConfigToken, KuiCoreConfig } from '@knora/core';

describe('LemmataComponent', () => {
  let component: LemmataComponent;
  let fixture: ComponentFixture<LemmataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KuiViewerModule, RouterTestingModule],
      declarations: [LemmataComponent],
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
    fixture = TestBed.createComponent(LemmataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
