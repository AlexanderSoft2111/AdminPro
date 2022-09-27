import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  public tipo: 'usuarios'|'hospitales'|'medicos' = 'usuarios';
  public id: string = '';
  public img?: string = '';

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  private _ocultarModal: boolean = true;

  get ocultarModal(){
    return this._ocultarModal;

  }
  
  constructor() { }
  
  abrirModal(
    tipo: 'usuarios'|'hospitales'|'medicos',
    id: string,
    img: string = 'no-img'
    ){
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    if(img.includes('https')){
      this.img = img;
    } else {
      //http://localhost:3005/api/uploads/medicos/e57e838e-dc27-489e-891f-5e30ce1d8aff.jpg
      this.img = `${baseUrl}/uploads/${tipo}/${img}`
    }

  }

  cerrarModal(){
    this._ocultarModal = true;
  }



}
