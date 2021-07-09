import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Students } from 'src/app/models/students';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  studentsList: Students[] = [];
  token: string;
  userName: string;
  email: string;

  constructor(
    private UserService: UserAuthService,
    private Router:Router
  ) { }

  ngOnInit(): void {
    this.UserService.studentslist().subscribe(data => {
      this.studentsList = [...data]
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
