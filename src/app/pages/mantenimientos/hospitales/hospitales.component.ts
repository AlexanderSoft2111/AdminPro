import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';
import { BusquedaService } from '../../../services/busqueda.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSusb?: Subscription;
  public hospitalesTemp: Hospital[] = [];

  constructor(private hospitalService: HospitalService,
              private modalImagenService: ModalImagenService,
              private busquedaService: BusquedaService) { }

  ngOnInit(): void {

    this.cargarHospitales();
    this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)//Esperamos a que ocurra una milesima de segundo antes de llamar el subcrib
    )
    .subscribe(img => {
      this.cargarHospitales();
    });
    
  }

  ngOnDestroy(): void {
    this.imgSusb?.unsubscribe();
  }
  
  cargarHospitales(){
    
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe( hospitales => {
      this.hospitales = hospitales;
      this.hospitalesTemp = hospitales;
      this.cargando = false;
    } );
  }

  async crearHospital(){
    const { value = '' } = await Swal.fire<string>({
      title: 'Agregar Hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre de hospital',
      showCancelButton: true
    })
    
    if (value?.trim().length !== 0) {
      this.hospitalService.crearHospital(value).subscribe(resp => {

        this.cargarHospitales();
        Swal.fire('Guardado con éxito', value, 'success');
        
      });
    }
    
  }
  
  actualizarHospital(hospital: Hospital){
    
    if(hospital._id){
      this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe((resp:any) => {
        this.hospitales.push(resp.hospital);
        Swal.fire('Actualizado con éxito', hospital.nombre, 'success');
          });
    }
  }
  
  eliminarHospital(hospital: Hospital){
    
    if(hospital._id){
      this.hospitalService.borrarHospital(hospital._id)
      .subscribe((resp:any) => {
        this.cargarHospitales();
        Swal.fire('Eliminado con éxito', hospital.nombre, 'success');
          });
    }
  }

  
  abrirModal(hospital:Hospital){

    if(hospital._id){
      this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
    }
  }

  buscar(termino: string){

    if(termino.trim().length === 0){
     return this.hospitales = this.hospitalesTemp;
    }

    return this.busquedaService.buscar('hospitales',termino)
        .subscribe((resultados: Hospital[]) => {
         this.hospitales = resultados;
        });
  }

}
