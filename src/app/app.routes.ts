import { Routes } from '@angular/router';
import { CombinationComponent } from './pages/combination/combination.component';
import { ConditionalComponent } from './pages/conditional/conditional.component';
import { CreationComponent } from './pages/creation/creation.component';
import { Examples1Component } from './pages/examples1/examples1.component';
import { Examples2Component } from './pages/examples2/examples2.component';
import { Examples3Component } from './pages/examples3/examples3.component';
import { Examples4Component } from './pages/examples4/examples4.component';
import { Examples5Component } from './pages/examples5/examples5.component';
import { HomeComponent } from './pages/home/home.component';
import { MathematicalComponent } from './pages/mathematical/mathematical.component';
import { MulticastingComponent } from './pages/multicasting/multicasting.component';
import { TransformationComponent } from './pages/transformation/transformation.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'operators/combination', component: CombinationComponent },
  {
    path: 'operators/combination/:id',
    component: CombinationComponent,
  },
  { path: 'operators/conditional', component: ConditionalComponent },
  {
    path: 'operators/conditional/:id',
    component: ConditionalComponent,
  },
  { path: 'operators/creation', component: CreationComponent },
  {
    path: 'operators/creation/:id',
    component: CreationComponent,
  },
  { path: 'operators/mathematical', component: MathematicalComponent },
  {
    path: 'operators/mathematical/:id',
    component: MathematicalComponent,
  },
  { path: 'operators/multicasting', component: MulticastingComponent },
  {
    path: 'operators/multicasting/:id',
    component: MulticastingComponent,
  },
  { path: 'operators/transformation', component: TransformationComponent },
  {
    path: 'operators/transformation/:id',
    component: TransformationComponent,
  },
  { path: 'examples1', component: Examples1Component },
  { path: 'examples2', component: Examples2Component },
  { path: 'examples3', component: Examples3Component },
  { path: 'examples4', component: Examples4Component },
  { path: 'examples5', component: Examples5Component },
  { path: '**', redirectTo: '' },
];
