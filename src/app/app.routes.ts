import { Routes } from '@angular/router';
import { CombinationComponent } from './pages/combination/combination.component';
import { ConditionalComponent } from './pages/conditional/conditional.component';
import { CreationComponent } from './pages/creation/creation.component';
import { ErrorComponent } from './pages/error/error.component';
import { Examples1Component } from './pages/examples1/examples1.component';
import { Examples2Component } from './pages/examples2/examples2.component';
import { Examples3Component } from './pages/examples3/examples3.component';
import { Examples4Component } from './pages/examples4/examples4.component';
import { Examples5Component } from './pages/examples5/examples5.component';
import { FilteringComponent } from './pages/filtering/filtering.component';
import { HomeComponent } from './pages/home/home.component';
import { MathematicalComponent } from './pages/mathematical/mathematical.component';
import { MulticastingComponent } from './pages/multicasting/multicasting.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { TransformationComponent } from './pages/transformation/transformation.component';
import { UtilityComponent } from './pages/utility/utility.component';

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
  { path: 'operators/error', component: ErrorComponent },
  {
    path: 'operators/error/:id',
    component: ErrorComponent,
  },
  { path: 'operators/filtering', component: FilteringComponent },
  {
    path: 'operators/filtering/:id',
    component: FilteringComponent,
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
  { path: 'operators/utility', component: UtilityComponent },
  {
    path: 'operators/utility/:id',
    component: UtilityComponent,
  },
  { path: 'subjects', component: SubjectsComponent },
  {
    path: 'subjects/:id',
    component: SubjectsComponent,
  },
  { path: 'examples1', component: Examples1Component },
  { path: 'examples2', component: Examples2Component },
  { path: 'examples3', component: Examples3Component },
  { path: 'examples4', component: Examples4Component },
  { path: 'examples5', component: Examples5Component },
  { path: '**', redirectTo: '' },
];
