import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UsersService} from './common/users.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './common/auth.service';
import { LogoutComponent } from './logout/logout.component';
import {AuthGuard} from './common/auth.guard';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule


  ],
  providers: [
    UsersService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
