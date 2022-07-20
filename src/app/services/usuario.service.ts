import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

import { environment } from '../../environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) { }

  crearUsuario(formData: RegisterForm){
    
    return this.http.post(`${base_url}/usuarios`, formData)
                .pipe(
                  tap((res:any) => localStorage.setItem('token', res.token))
                );
              
  }

  login(formData: any){
    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap((res:any) => localStorage.setItem('token', res.token))
                );
  }

  loginGoogle(token: any){
    return this.http.post(`${base_url}/login/google`, {token})
                .pipe(
                  tap((res:any) => localStorage.setItem('token', res.token))
                );
  }

  validarToken(){
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token //enviamos en el header el valor del token
      }
    }).pipe( //nos permite ejecutar mas funciones dentro de una promesa
      tap((res:any) => localStorage.setItem('token', res.token)), //nos permite hacer un paso extra
      map(res => true), //devolvemos true en la promesa
      catchError(err => of(false)) //devolvemos false indicandole con el of que transforme el error por un false
    );
  }

  logout(){
    localStorage.removeItem('token');
    google.accounts.id.revoke('alex.tofis21@gmail.com', () => {

       //El gnzone se utiliza para hacer que angular no pierda el control cuando utiliza librerias de terceros para realizar una navegación como la de google
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });

  }

}
