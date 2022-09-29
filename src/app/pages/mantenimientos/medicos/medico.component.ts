import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medicos.model';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html'
})
export class MedicoComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public hospitalSeleccionado?: Hospital;
  public medicoSeleccionado?: Medico;

  public medicoForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    hospital: ['', Validators.required],
  });;



  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({id}) => this.cargarMedico(id));

    this.cargarHospitales();

    //Metodo para subscribirme a los cambios del dropdown y poder encontrar el hospital seleccionado
    this.medicoForm.get('hospital')?.valueChanges.subscribe( hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId);
    });
  }

  cargarHospitales(){

    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
    });
  }

  cargarMedico(id: string){
    if(id === 'nuevo'){
      return;
    }
    this.medicoService.cargarMedicoById(id)
        .pipe(
          delay(100)
        )
        .subscribe({
          next: (medico) => {
            const { nombre } = medico; 
            const  _id = medico.hospital?._id; 
            this.medicoSeleccionado = medico;
            this.medicoForm.setValue({nombre, hospital: _id});
           },
          error: (err) => {
            console.log(err);
            this.router.navigateByUrl(`dashboard/medicos`);

          }
        })
  }

  guardarMedico(){

    const {nombre, hospital} = this.medicoForm.value;

    if(this.medicoSeleccionado){
      //actualizar
      const _id = this.medicoSeleccionado._id;

      if(_id){
        this.medicoService.actualizarMedico(_id,nombre,hospital)
            .subscribe(resp => {
              Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');
            })
      }
    } else {
      // crear
      this.medicoService.crearMedico(nombre, hospital)
          .subscribe((resp: any) => {
  
            console.log(resp);
            this.medicoSeleccionado = resp.medicoDB;
            Swal.fire(
              'Creado',
              `Se creo con éxito a ${this.medicoSeleccionado?.nombre}`,
              'success'
            )
            this.router.navigateByUrl(`dashboard/medico/${this.medicoSeleccionado?._id}`);
          });
    }
    }

}
