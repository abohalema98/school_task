import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authenticaton/auth.guard';
import { PasswordAuthGuard } from './authenticaton/password-auth.guard';
import { AuthComponent } from './component/auth/auth.component';
import { DetailsComponent } from './component/auth/details/details.component';
import { ErrorComponent } from './component/error/error.component';
import { HomeComponent } from './component/shared/home/home.component';
import { LoginComponent } from './component/shared/login/login.component';
import { ConfirmPasswordComponent } from './component/shared/resetpassword/confirm-password/confirm-password.component';
import { ResetpasswordComponent } from './component/shared/resetpassword/resetpassword.component';
import { SignupComponent } from './component/shared/signup/signup.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'confirmpassword', component: ConfirmPasswordComponent , canActivate:[PasswordAuthGuard]},
  { path: 'auth', component:AuthComponent , canActivate:[AuthGuard] },
  { path: 'details/:id', component:DetailsComponent , canActivate:[AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
