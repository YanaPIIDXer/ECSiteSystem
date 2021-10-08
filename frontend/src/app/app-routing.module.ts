import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TopViewComponent } from './Views/top-view/top-view.component';

const routes: Routes = [
  { path: "", component: TopViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
