import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {UserAuthService} from '../../../services/user-auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginSubscription: Subscription;
  userAuthStatus = false;

  constructor(
    private UserService:UserAuthService ,
    public Router: Router
  ) { }


  ngOnInit(): void {
    this.loginSubscription = this.UserService.authStatusListener().subscribe(isUserAuth => {
      this.userAuthStatus = isUserAuth;
    })
  }
  logStat(){
    console.log(this.userAuthStatus)
  }
  onlogOut() {
    this.UserService.logOut();
  };

  isLogedin() {
    console.log(this.UserService.isUserLoggedin())

  }
  getPayload() {
    console.log(this.UserService.getUserPayload())

  }
  getToken() {
    console.log(this.UserService.getToken())

  }

}
