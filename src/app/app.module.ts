import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { AppComponent } from './app.component';
import { AuthComponent } from './component/auth/auth.component';
import { ErrorComponent } from './component/error/error.component';
import { HeaderComponent } from './component/shared/header/header.component';
import { HomeComponent } from './component/shared/home/home.component';
import { LoginComponent } from './component/shared/login/login.component';
import { SignupComponent } from './component/shared/signup/signup.component';
import { ResetpasswordComponent } from './component/shared/resetpassword/resetpassword.component';
import { ConfirmPasswordComponent } from './component/shared/resetpassword/confirm-password/confirm-password.component';
import { DetailsComponent } from './component/auth/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ErrorComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ResetpasswordComponent,
    ConfirmPasswordComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
     BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      // closeButton:true,
      tapToDismiss: true,
      // positionClass: 'inline',
      maxOpened: 1
      , preventDuplicates: true

    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// CommonModule,
// BrowserModule,
// AppRoutingModule,
// ReactiveFormsModule,
// FormsModule,
// HttpClientModule,
