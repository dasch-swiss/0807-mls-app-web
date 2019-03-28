import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// style / design
import { MaterialModule } from './material-module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// knora-ui modules
import {KuiCoreConfig, KuiCoreConfigToken, KuiCoreModule, ReadTextValueAsHtml} from '@knora/core';
import { KuiActionModule } from '@knora/action';
import { KuiSearchModule } from '@knora/search';
import { KuiViewerModule } from '@knora/viewer';
import { KuiAuthenticationModule } from '@knora/authentication';

// routing
import { AppRoutingModule } from './app-routing.module';

// Components, Services, Directives and Pipes
import { AppComponent } from './app.component';
import { ResourceComponent } from './resource/resource.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { HomepageComponent } from './homepage/homepage.component';
import {AppInitService} from './app-init.service';


export function initializeApp(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.Init();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ResourceComponent,
    SearchResultComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    NoopAnimationsModule,
    KuiCoreModule,
    KuiAuthenticationModule,
    KuiActionModule,
    KuiSearchModule,
    KuiViewerModule
  ],
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppInitService], multi: true
    },
    {
      provide: KuiCoreConfigToken, useFactory: () => AppInitService.coreConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
