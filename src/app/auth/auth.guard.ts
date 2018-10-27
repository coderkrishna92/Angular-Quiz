import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {

  }

  /**
   * The function implementation defined below
   * determines whether or not access should be granted
   * towards the current component
  */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('participant') != null) {
      return true
    } else {
      this.router.navigate(['/register']);
      return false;
    }
  }
}
