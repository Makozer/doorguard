import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './data/data.component';
import { ControlsComponent } from './controls/controls.component';

const routes: Routes = [
  { path: '', redirectTo: '/log', pathMatch: 'full' },
  { path: 'log', component: DataComponent },
  { path: 'controls', component: ControlsComponent },
  // { path: 'log/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
