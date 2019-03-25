import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCheckboxModule, MatDividerModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { SearchResultComponent } from './search-result.component';
import { KuiCoreConfigToken, KuiCoreConfig } from '@knora/core';
import { ProgressIndicatorComponent, KeyPipe } from '@knora/action';
import { BooleanValueComponent,
  ColorValueComponent,
  DateValueComponent,
  DecimalValueComponent,
  GeometryValueComponent,
  IntegerValueComponent,
  IntervalValueComponent,
  LinkValueComponent,
  ListValueComponent,
  TextValueAsStringComponent,
  TextValueAsHtmlComponent,
  TextValueAsXmlComponent,
  TextfileValueComponent,
  UriValueComponent,
  StillImageComponent
 } from '@knora/viewer';
import { of } from 'rxjs';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  const mode = 'fulltext';
  const q = 'test';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        MatCheckboxModule,
        MatDividerModule,
        MatIconModule,
        MatToolbarModule,
        RouterTestingModule
      ],
      declarations: [
        SearchResultComponent,
        ProgressIndicatorComponent,
        KeyPipe,
        BooleanValueComponent,
        ColorValueComponent,
        DateValueComponent,
        DecimalValueComponent,
        GeometryValueComponent,
        IntegerValueComponent,
        IntervalValueComponent,
        LinkValueComponent,
        ListValueComponent,
        TextValueAsStringComponent,
        TextValueAsHtmlComponent,
        TextValueAsXmlComponent,
        TextfileValueComponent,
        UriValueComponent,
        StillImageComponent
      ],
      providers: [
        HttpClient,
        {
          provide: KuiCoreConfigToken,
          useValue: KuiCoreConfig
        },
        {
          provide: ActivatedRoute,
          useValue: {
              params: of({
                  get: (param: string) => {
                      if (param === 'q') {
                          return q;
                      } else {
                          return mode;
                      }
                  }
              })
          }
      }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
