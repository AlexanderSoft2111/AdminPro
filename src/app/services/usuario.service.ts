import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

import { environment } from '../../environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { ThisReceiver } from '@angular/compiler';

const base_url = environment.base_url;

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  usuario?: Usuario;

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario?.uid || '';
  }

  
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

  
  logout(){
    localStorage.removeItem('token');
    google.accounts.id.revoke('alex.tofis21@gmail.com', () => {

      //El gnzone se utiliza para hacer que angular no pierda el control cuando utiliza librerias de terceros para realizar una navegación como la de google
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });

  }

  validarToken(){
  
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token //enviamos en el header el valor del token
      }
    }).pipe( //nos permite ejecutar mas funciones dentro de una promesa
      map((res:any) => {
        localStorage.setItem('token', res.token);
        const {nombre, email, img = '', google, uid, role} = res.usuario;
        this.usuario = new Usuario(nombre, email, '', img, role, google, uid);
        return true
      }), //nos permite hacer un paso extra y devolver lo que querramos
      catchError(err => of(false)) //devolvemos false indicandole con el of que transforme el error por un false
    );
  }

  actualizarUsuario(data: {nombre:string, email:string, role?:string}){
    data = {
      ...data,
      role: this.usuario?.role
    }
    return this.http.put(`${base_url}/usuarios/${this.uid}`,data, {
      headers: {
        'x-token': this.token
      }
    });
  }
}
