import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TopViewComponent } from './Views/top-view/top-view.component';
import { AdminLoginComponent } from './Views/admin-login/admin-login.component';
import { AdminTopComponent } from './Views/admin-top/admin-top.component';
import { UserRegisterComponent } from './Views/user-register/user-register.component';

const routes: Routes = [
  { path: "", component: TopViewComponent },
  { path: "login_admin", component: AdminLoginComponent },
  { path: "admin_top", component: AdminTopComponent },
  { path: "register", component: UserRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
