import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private baseURL: string = environment.BACKEND_URL
  loginStatus = new Subject<boolean>();
  private timeOut: any = localStorage.getItem('expireTime')
  userId: number;


  login(email: string, password: any) {
    let user = {
      email: email,
      password: password
    }
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.post(this.baseURL + "/userLogin", JSON.stringify(user), { headers: headers })
  }
  onAddDetailes() {
    return this.http.post("http://localhost:3000/auth/users", this.userId).subscribe(res=>{
      console.log(res)
    })
  }
  userID(){
    return this.userId
  }
  authStatusListener() {
    return this.loginStatus.asObservable();
  }

  registerUser(newUser: User) {
    return this.http.post<User>(this.baseURL + "/signup", newUser)
  }

  Userlist() {
    return this.http.get<User[]>(environment.GET_URL)
  }

  logOut() {
    localStorage.removeItem('Authorization')
    const activeAuth = localStorage.getItem('Authorization')
    if (activeAuth != null) {
      return;
    }
    this.loginStatus.next(false)
    this.router.navigate(["/login"])
    // clearTimeout(this.timeOut)
  }

  getToken() {
    return localStorage.getItem('Authorization')
  }

  isUserLoggedin() {
    let userPayload = this.getUserPayload();
    if (userPayload) {
      // return userPayload.exp > Date.now() / 1000
      return userPayload.exp > Date.now() / 1000
    } else {
      return null;
    }
  }


  getUserPayload() {
    let token = this.getToken();
    if (token) {
      let userpaylad = atob(token.split('.')[1])
      return JSON.parse(userpaylad)
    } else {
      return null;
    }
  }

  constructor(private http: HttpClient,
    private router: Router) { }
}
