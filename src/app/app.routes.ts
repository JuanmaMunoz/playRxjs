import { Routes } from '@angular/router';
import { Examples1Component } from './pages/examples1/examples1.component';
import { Examples2Component } from './pages/examples2/examples2.component';
import { Examples3Component } from './pages/examples3/examples3.component';
import { Examples4Component } from './pages/examples4/examples4.component';
import { Examples5Component } from './pages/examples5/examples5.component';
import { HomeComponent } from './pages/home/home.component';
import { TransformationComponent } from './pages/transformation/transformation.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'operators/transformation', component: TransformationComponent },
  {
    path: 'operators/transformation/:operator',
    component: TransformationComponent,
  },
  { path: '', component: Examples1Component },
  { path: 'examples1', component: Examples1Component },
  { path: 'examples2', component: Examples2Component },
  { path: 'examples3', component: Examples3Component },
  { path: 'examples4', component: Examples4Component },
  { path: 'examples5', component: Examples5Component },
];
