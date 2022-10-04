import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedaService } from '../../services/busqueda.service';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medicos.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private busquedaService: BusquedaService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({termino}) => {
      this.buscarTodo(termino);
    });
  }

  buscarTodo(termino: string){

    this.busquedaService.buscarTodo(termino).subscribe( (resp: any) =>  {
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    });

  }

}
