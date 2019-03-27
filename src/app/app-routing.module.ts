import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourceComponent } from './resource/resource.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'resource/:iri',
    component: ResourceComponent
  },
  {
    path: 'search',
    children: [
      {
        path: ':mode/:q/:project',
        component: SearchResultComponent
      },
      {
        path: ':mode/:q',
        component: SearchResultComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
