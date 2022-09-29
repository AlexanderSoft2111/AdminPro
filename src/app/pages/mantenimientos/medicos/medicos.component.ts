import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medicos.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';
import { BusquedaService } from '../../../services/busqueda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  public imgSusb?: Subscription;
  public medicosTemp: Medico[] = [];

  constructor(private medicoService: MedicoService,
              private modalImagenService: ModalImagenService,
              private busquedaService: BusquedaService) { }


  ngOnInit(): void {
    
    this.cargarMedicos();
    this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)//Esperamos a que ocurra una milesima de segundo antes de llamar el subcrib
    )
    .subscribe(img => {
      this.cargarMedicos();
    });
    
  }

  ngOnDestroy(): void {
    this.imgSusb?.unsubscribe();
  }

  abrirModal(medico:Medico){

    if(medico._id){
      this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
    }
  }

  buscar(termino: string){

    if(termino.trim().length === 0){
     return this.medicos = this.medicosTemp;
    }

    return this.busquedaService.buscar('medicos',termino)
        .subscribe((medicos: Medico[]) => {
         this.medicos = medicos;
        });
  }

  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos()
         .subscribe(medicos => {
           this.cargando = false;
          this.medicos = medicos;
          this.medicosTemp = medicos;
         });
  }

  eliminarMedico(medico: Medico){

    if(medico._id){
      Swal.fire({
        title: '¿Quieres Borrar?',
        text: `Estas seguro de borrar a ${medico.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, Borrar'
      }).then((result) => {
        if (result.isConfirmed) {
          //Llamando el serivio para borrar el medico
          this.medicoService.borrarMedico(medico._id)
              .subscribe(() => {
                this.cargarMedicos();
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

}
