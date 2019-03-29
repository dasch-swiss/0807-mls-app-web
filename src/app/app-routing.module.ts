import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourceComponent } from './resource/resource.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchResultsComponent } from '@knora/viewer';
import { ResourcesListComponent } from './resource/resources-list/resources-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'resource/:id',
    component: ResourceComponent
  },
  {
    path: 'search',
    children: [
      {
        path: ':mode/:q/:project',
        component: SearchResultsComponent
      },
      {
        path: ':mode/:q',
        component: SearchResultsComponent
      }
    ]
  },
  {
    path: 'lemmata',
    component: ResourcesListComponent
  },
  {
    path: 'artikel',
    component: ResourcesListComponent
  },
  {
    path: 'lexika',
    component: ResourcesListComponent
  },
  {
    path: 'bibliothek',
    component: ResourcesListComponent
  },
  {
    path: 'ort',
    component: ResourcesListComponent
  },
  {
    path: 'tatigkeit',
    component: ResourcesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
