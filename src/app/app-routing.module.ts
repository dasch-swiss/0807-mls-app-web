import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourceComponent } from './resource/resource.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LemmataComponent } from './resource/lemmata/lemmata.component';
import { ArtikelComponent } from './resource/artikel/artikel.component';
import { LexikaComponent } from './resource/lexika/lexika.component';
import { SearchResultsComponent } from '@knora/viewer';

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
    component: LemmataComponent
  },
  {
    path: 'article',
    component: ArtikelComponent
  },
  {
    path: 'lexika',
    component: LexikaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
