import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourceComponent } from './resource/resource.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchResultsComponent } from '@knora/viewer';
import { ResourcesListComponent } from './resource/resources-list/resources-list.component';
import { ErrorComponent } from './error/error.component';

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
  },
  {
    path: '**',
    component: ErrorComponent,
    data: { status: 404 }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
