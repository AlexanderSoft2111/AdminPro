import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedaService } from '../../../services/busqueda.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, pipe, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public total: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = false;
  public imgSusb?: Subscription;
  
  constructor( private usuarioService: UsuarioService,
               private busquedaService: BusquedaService,
               private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSusb?.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarUsuarios();
    this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)//Esperamos a que ocurra una milesima de segundo antes de llamar el subcrib
    )
    .subscribe(img => {
      this.cargarUsuarios();
    });
    
  }
  
  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({total, usuarios}) => {
        this.total = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number){
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0
    } else if (this.desde >= this.total){
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string){
    if(termino.trim().length === 0){
     return this.usuarios = this.usuariosTemp;
    }

    return this.busquedaService.buscar('usuarios',termino)
        .subscribe((resultados: any[]) => {
         this.usuarios = resultados;
        });
  }

  eliminarUsuario(usuario: Usuario){

    if(usuario.uid === this.usuarioService.uid){

      return Swal.fire('Error', 'No se puede borrar a si mismo', 'error');
    } else {

      //Framework para alertas de popUps
     return Swal.fire({
        title: '¿Quieres Borrar?',
        text: `Estas seguro de borrar a ${usuario.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, Borrar'
      }).then((result) => {
        if (result.isConfirmed) {
          //Llamando el serivio para borrar el usuario
          this.usuarioService.eliminarUsuario(usuario)
              .subscribe(() => {
                this.cargarUsuarios();
                Swal.fire(
                  'Eliminado!',
                  'Se elimino con éxito',
                  'success'
                )
              });
        }
      })
    }


  }

  cambiarRol(usuario: Usuario){
    this.usuarioService.guardarUsuario(usuario)
        .subscribe(() => console.log('Se actualizo con éxito'));
  }

  abrirModal(usuario:Usuario){
    console.log(usuario);
    if(usuario.uid){
      this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
    }
  }
}
