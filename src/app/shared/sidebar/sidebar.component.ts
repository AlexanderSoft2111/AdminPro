import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menu:any [] = this.sidebarService.menu;
  usuario?: Usuario;

  constructor(public sidebarService: SidebarService,
              public usuarioService: UsuarioService) {

    this.usuario = usuarioService.usuario; //Instanceamos a la clase del usuario por medio del servicio      
   }

  ngOnInit(): void {
  }

}
