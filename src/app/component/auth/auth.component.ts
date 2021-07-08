import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  UserList: User[] = [];
  token: string;
  userName: string;
  email: string;

  constructor(
    private UserService: UserAuthService,
    private Router:Router
  ) { }

  ngOnInit(): void {
    this.UserService.Userlist().subscribe(data => {
      this.UserList = [...data]
      // console.log(this.UserList)
    })
    this.userName = this.UserService.getUserPayload().name
    this.email = this.UserService.getUserPayload().email
  }
  onDeitals(userID: number) {
    this.UserService.userId = userID
    this.Router.navigate(['/details/' + userID])
  }

  tokenUser() {
    console.log(this.UserService.getToken())
  }
  isLogedin() {
    console.log(this.UserService.isUserLoggedin())
  }
  getPayload() {
    console.log(this.UserService.getUserPayload())
  }

  tokenString() {
    this.token = this.UserService.getToken()
  }

}
