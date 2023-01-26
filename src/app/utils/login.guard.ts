import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ApiService } from './api.service';
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(public service: ApiService, public router: Router) {}
  canActivate(): boolean {
    if (!this.service.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
