import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Medico } from '../models/medicos.model';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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
  
  constructor(private http: HttpClient) { }

  actualizarMedico(_id: string, nombre: string, hospital: string){
    
    const url = `${base_url}/medicos/${_id}`;
    return this.http.put(url, { nombre, hospital }, this.headers);

  }

  borrarMedico(_id:string = ''){
    
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers);

  }
  
  
  cargarMedicos(){
    const url = `${base_url}/medicos`;
    return this.http.get<{ok: boolean, medicos: Medico[] }>(url, this.headers )
            .pipe(
            map((resp: {ok: boolean, medicos: Medico[] }) => resp.medicos)
            )
  }
  
  cargarMedicoById(id: string){
    const url = `${base_url}/medicos/${id}`;
    return this.http.get<{ok: boolean, medico: Medico }>(url, this.headers )
            .pipe(
            map((resp: {ok: boolean, medico: Medico }) => resp.medico)
            )
  }

  crearMedico(nombre: string, hospital: string){
    
    const url = `${base_url}/medicos`;
    return this.http.post(url, {nombre, hospital }, this.headers);

  }

}
