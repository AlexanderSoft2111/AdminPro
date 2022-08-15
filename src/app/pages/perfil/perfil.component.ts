import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { UploadFileService } from '../../services/upload-file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit{

  perfilForm: any;
  usuario?: Usuario;
  subirImagen?: File;
  imgTemp: any = '';
  
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private uploadFileService: UploadFileService) {

      this.usuario = usuarioService.usuario;

     }
    
    ngOnInit(): void {
      this.perfilForm = this.fb.group({
        nombre: [this.usuario?.nombre,Validators.required],
        email: [this.usuario?.email,[Validators.required, Validators.email]]
      });
      
  }

  actualizarPerfil(){
    if(this.perfilForm.invalid){
      return
    }
    this.perfilForm.value.nombre
    this.usuarioService.actualizarUsuario(this.perfilForm.value)
            .subscribe({
              next: (res:any) => {

                const {nombre, email } = res.usuarioActualizado;
                if(this.usuario){
                  this.usuario.nombre = nombre;
                  this.usuario.email = email;
  
                  Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
                }
              }, 
              error: (e) => {
              Swal.fire('Error', e.error.msg, 'error');
            }
          }); //Hay que subscribirse a los cambios para efectuar los resultados

  }

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

  async cargarArchivo(){
    if(!this.subirImagen || !this.usuario?.uid){
      return
    }
    const img = await this.uploadFileService.actualizarFoto(this.subirImagen,'usuarios',this.usuario.uid)// regreso el nombre de la imagen
    if(!img){
      this.usuario.img = img; //Establezco la nueva imagen
      Swal.fire('Guardado', 'Imagen actualizada', 'success');
    } else {
      Swal.fire('Error', 'No se pudo guardar la imagen', 'error');
    }

  }

}
