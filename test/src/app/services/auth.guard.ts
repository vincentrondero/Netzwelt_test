import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuard: canActivate called');
    if (this.authService.isAuthenticatedState()) {
      console.log('AuthGuard: User is authenticated, allowing access');
      return true;
    } else {
      console.log('AuthGuard: User is not authenticated, redirecting to login page');
      return this.router.createUrlTree(['/login']);
    }
  }
  


}
