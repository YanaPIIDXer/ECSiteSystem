import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TopViewComponent } from './Views/top-view/top-view.component';
import { AdminLoginComponent } from './Views/admin-login/admin-login.component';

const routes: Routes = [
  { path: "", component: TopViewComponent },
  { path: "login_admin", component: AdminLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
