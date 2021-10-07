import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MediaService } from '../services/media.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService,
              private toastr: ToastrService) {}
  canActivate(): Observable<boolean> {
      return this.userService.currentUser$.pipe(
        map(user => {
          if(user) return true;
          this.toastr.error('You need to log in');
          return false;
        })
      );
  }
  
}
