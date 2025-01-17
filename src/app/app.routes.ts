import { Routes } from '@angular/router';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { BasicComponent } from './pages/basic/basic.component';
import { CombinationComponent } from './pages/combination/combination.component';
import { ConditionalComponent } from './pages/conditional/conditional.component';
import { CreationComponent } from './pages/creation/creation.component';
import { ErrorComponent } from './pages/error/error.component';
import { FilteringComponent } from './pages/filtering/filtering.component';
import { HomeComponent } from './pages/home/home.component';
import { MathematicalComponent } from './pages/mathematical/mathematical.component';
import { MulticastingComponent } from './pages/multicasting/multicasting.component';
import { RealLifeComponent } from './pages/real-life/real-life.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { TransformationComponent } from './pages/transformation/transformation.component';
import { UtilityComponent } from './pages/utility/utility.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'basicConcepts', component: BasicComponent },
  {
    path: 'basicConcepts/:id',
    component: BasicComponent,
  },
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
  {
    path: 'aboutMe',
    component: AboutMeComponent,
  },
  {
    path: 'realLife/examples',
    component: RealLifeComponent,
  },
  {
    path: 'realLife/examples/:id',
    component: RealLifeComponent,
  },
  { path: '**', redirectTo: 'home' },
];
