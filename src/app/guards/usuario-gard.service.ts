import { WebsocketsService } from './../services/websockets.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGard implements CanActivate{

  constructor(public wsservice: WebsocketsService, private router: Router) { }

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    if(this.wsservice.getUsuario())  return true;
    else {
      this.router.navigateByUrl('/');
    };

  }
}
