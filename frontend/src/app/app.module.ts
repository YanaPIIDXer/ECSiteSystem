import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopViewComponent } from './Views/top-view/top-view.component';
import { NavBarComponent } from './Views/nav-bar/nav-bar.component';
import { NavBarNotLogInComponent } from './Components/NavBar/nav-bar-not-log-in/nav-bar-not-log-in.component';
import { NavBarAdminComponent } from './Components/NavBar/nav-bar-admin/nav-bar-admin.component';
import { NavBarUserComponent } from './Components/NavBar/nav-bar-user/nav-bar-user.component';
import { AdminLoginComponent } from './Views/admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    TopViewComponent,
    NavBarComponent,
    NavBarNotLogInComponent,
    NavBarAdminComponent,
    NavBarUserComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
