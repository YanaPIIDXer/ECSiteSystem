import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TopViewComponent } from './Views/top-view/top-view.component';
import { AdminLoginComponent } from './Views/admin-login/admin-login.component';
import { AdminTopComponent } from './Views/admin-top/admin-top.component';
import { UserRegisterComponent } from './Views/user-register/user-register.component';
import { UserLoginComponent } from './Views/user-login/user-login.component';
import { CartComponent } from './Views/cart/cart.component';
import { AddProductComponent } from './Views/add-product/add-product.component';
import { HistoryComponent } from './Views/history/history.component';
import { AdminOnlyGuard } from './Guards/admin-only.guard';
import { UserOnlyGuard } from './Guards/user-only.guard';

const routes: Routes = [
  { path: "", component: TopViewComponent },
  { path: "login_admin", component: AdminLoginComponent },
  { path: "admin_top", component: AdminTopComponent, canActivate: [ AdminOnlyGuard ] },
  { path: "register", component: UserRegisterComponent },
  { path: "login", component: UserLoginComponent },
  { path: "cart", component: CartComponent, canActivate: [ UserOnlyGuard ] },
  { path: "admin/add_product", component: AddProductComponent, canActivate: [ AdminOnlyGuard ] },
  { path: "history", component: HistoryComponent, canActivate: [ UserOnlyGuard ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
