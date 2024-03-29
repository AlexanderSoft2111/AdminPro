import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuarioService: UsuarioService,
              private router: Router){}
              
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.usuarioService.validarToken()
               .pipe(
                tap(estaAutenticado => {
                  if(!estaAutenticado){
                    this.router.navigateByUrl('/login');
                  }
                })
               )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      //Ejecutamos la funcion para retor un false o true si esta autenticado
    return this.usuarioService.validarToken()
               .pipe(
                tap(estaAutenticado => {
                  if(!estaAutenticado){
                    this.router.navigateByUrl('/login');
                  }
                })
               )
    
  }
  
}
