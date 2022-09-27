import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { Usuario } from '../../models/usuario.model';
import { UploadFileService } from '../../services/upload-file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {

  subirImagen?: File;
  imgTemp: any = '';

  //Cuando se hace publico el servicio se puede utilizar sus propiedades directas en el HTML y se conocen como singleton
  constructor(public modalImagenService: ModalImagenService,
              private uploadFileService: UploadFileService) { }

  cambiarFoto(event: any){

    this.subirImagen = event.target.files[0]; //obtenemos la imagen del input y la igualamos a la propiedad de tipo file
    if(!event.target.files[0]){ // le indico que si no hay nada seleccionado no continue
      this.imgTemp = null;
      return this.imgTemp;
    }

    //Codigo para cambiar la vista previa
    const reader = new FileReader(); //nos permite extraer los metodos para convertir la imagen en un string
    reader.readAsDataURL(event.target.files[0]); //Leemos el archivo seleccionado

    reader.onloadend = () => { //Cargamos el archivo leido y lo convertimos
      this.imgTemp = reader.result;
    }

  }

  cerrarModal(){
    this.imgTemp = null;  
    this.modalImagenService.cerrarModal();

  }

  async cargarArchivo(){

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    if(!this.subirImagen || !id){
      return
    }
    const img = await this.uploadFileService.actualizarFoto(this.subirImagen,tipo,id)// regreso el nombre de la imagen
    if(img){
      Swal.fire('Guardado', 'Imagen actualizada', 'success');
      this.modalImagenService.nuevaImagen.emit(img);
      this.cerrarModal();
    } else {
      Swal.fire('Error', 'No se pudo guardar la imagen', 'error');
      this.cerrarModal();
    }

  }


}
