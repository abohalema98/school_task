import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
   private baseURL: string = environment.PASSWORD_URL;
  isMatched: boolean = false;

  /**
   *
   * @param email
   * @returns
   */
  isemailfounded(email: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.Http.post(this.baseURL, { email })
  }

  /**
   *
   * @param newpassword
   * @param vcode
   * @returns
   */

  confirmPassword(newpassword: any, verificationCode: number) {
    return this.Http.put(this.baseURL, { newpassword, verificationCode })
  }


  constructor(private Http: HttpClient) { }

}
