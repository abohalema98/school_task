import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResetPasswordService } from '../services/reset-password.service'


@Injectable({
  providedIn: 'root'
})
export class PasswordAuthGuard implements CanActivate {
  constructor(private ResetpasswordService: ResetPasswordService,
    private Router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.ResetpasswordService.isMatched) {
      return true;
    } else {
      this.Router.navigate(["/login"])
      return false;
    }

    return true;
  }

}
