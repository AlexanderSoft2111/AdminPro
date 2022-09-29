import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medicos.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class BusquedaService {

  constructor(private http: HttpClient) { }

  
  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
                'x-token': this.token
              }
      }
  }

  private transformarUsuarios(tipo: any[]):Usuario[]{
    return tipo.map(user => user = new Usuario(user.nombre, user.email, '', user.img, user.role, user.google, user.uid));
  }
  
  private transformarHospitales(tipo: any[]):Hospital[]{
    return tipo.map(hospital => hospital = new Hospital(hospital.nombre, hospital._id, hospital.img, hospital.usuario));
  }
  
  private transformarMedicos(tipo: any[]):Medico[]{
    return tipo;
  }

  
  buscar(
    tipo: 'usuarios'|'medicos'|'hospitales',
    termino: string = '' 
    ){
      const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
      return this.http.get<any[]>(url, this.headers)
             .pipe(
              map((resp: any) => {

                switch (tipo) {
                  case 'usuarios':
                    return this.transformarUsuarios(resp.resultados);
                    ;
                  case 'hospitales':
                    return this.transformarHospitales(resp.resultados);
                  
                  case 'medicos':
                    return this.transformarMedicos(resp.resultados);
                
                  default:
                    return [];
                }

              })
             )
    }
}
