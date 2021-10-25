import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopViewComponent } from './Views/top-view/top-view.component';
import { NavBarComponent } from './Views/nav-bar/nav-bar.component';
import { NavBarNotLogInComponent } from './Components/NavBar/nav-bar-not-log-in/nav-bar-not-log-in.component';
import { NavBarAdminComponent } from './Components/NavBar/nav-bar-admin/nav-bar-admin.component';
import { NavBarUserComponent } from './Components/NavBar/nav-bar-user/nav-bar-user.component';
import { AdminLoginComponent } from './Views/admin-login/admin-login.component';
import { FormsModule } from '@angular/forms';
import { AdminTopComponent } from './Views/admin-top/admin-top.component';
import { NgxStripeModule } from 'ngx-stripe';
import { UserRegisterComponent } from './Views/user-register/user-register.component';
import { UserLoginComponent } from './Views/user-login/user-login.component';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './Views/cart/cart.component';
import { AddProductComponent } from './Views/add-product/add-product.component';
import { HistoryComponent } from './Views/history/history.component';
import { AdminOrderListComponent } from './Views/admin-order-list/admin-order-list.component';
import { UpdateUserInfoComponent } from './Views/update-user-info/update-user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    TopViewComponent,
    NavBarComponent,
    NavBarNotLogInComponent,
    NavBarAdminComponent,
    NavBarUserComponent,
    AdminLoginComponent,
    AdminTopComponent,
    UserRegisterComponent,
    UserLoginComponent,
    ProductCardComponent,
    CartComponent,
    AddProductComponent,
    HistoryComponent,
    AdminOrderListComponent,
    UpdateUserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxStripeModule.forRoot("pk_test_51Je3M8CpeCYoB8PV01iYTyFdrOZnCnGbzxJuV8VBNoV5ucwA4lDoyOLyKxl5n80mheXFDrLcFKV3VyTmd07pQ5pN00wn2y8qrR"),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
