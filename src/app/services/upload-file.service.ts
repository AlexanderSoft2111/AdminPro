import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {


  constructor() { }

  async actualizarFoto(archivo: File, tipo: 'usuarios' | 'medicos' | 'hospitales', id: string){

    try {
      
      const url = `${base}/uploads/${tipo}/${id}`; 
      const formData = new FormData(); // el formdata es para poder convertir y enviar la data al backend
      formData.append('imagen', archivo); //hay que inicializar el metodo append para transformar la data

      const resp = await fetch(url,{
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();
      if(data.ok){
        return data.nombreArchivo;
      } else {
        console.log(data.msg);
        return false;
      }

    } catch (error) {

      console.log(error);
      return false
    }

  }

}
