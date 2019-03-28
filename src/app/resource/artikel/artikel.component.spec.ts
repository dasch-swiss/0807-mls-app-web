import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikelComponent } from './artikel.component';
import { KuiViewerModule } from '@knora/viewer';
import { RouterTestingModule } from '@angular/router/testing';
import { KuiCoreConfigToken, KuiCoreConfig } from '@knora/core';

describe('ArtikelComponent', () => {
  let component: ArtikelComponent;
  let fixture: ComponentFixture<ArtikelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        KuiViewerModule,
        RouterTestingModule
      ],
      declarations: [ArtikelComponent],
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
    fixture = TestBed.createComponent(ArtikelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
