import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  errorMsg: string;
  tokenExpireTime: any;


  constructor(
    private userServies: UserAuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "email": new FormControl('', Validators.required),
      "password": new FormControl('', Validators.required)
    })
  } // ng Init


  onLogin(data) {
    if (data.invalid) {
      return;
    }
    let loginEmail = data.value.email;
    let loginPassword = data.value.password;

    this.userServies.login(loginEmail, loginPassword)
      .subscribe(isUserAuth => {
        let expireTime = isUserAuth['expiresIn']
        let token = isUserAuth['token']
        localStorage.setItem("Authorization", token);
        if (isUserAuth) {
          // this.tokenExpireTime = setTimeout(() => {
          //   localStorage.setItem("expireTime", this.tokenExpireTime)
          //   this.toastr.warning('Time is Expired')
          //   this.userServies.logOut()
          // }, expireTime * 60);
          this.userServies.loginStatus.next(true)
          this.toastr.success('login Success');
          this.router.navigate(["/auth"]);
        }
      },
        error => {
          this.errorMsg = error.error
          this.toastr.warning(this.errorMsg);
        }
      )
  }


}
