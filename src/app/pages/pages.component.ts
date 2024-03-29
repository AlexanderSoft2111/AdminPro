import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

//Funcion para poder utilizar una funcion a nivel del index 
declare function initFunctionMain(): any; 

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(public settingsService: SettingsService,
              public sidebarService: SidebarService) { }

  ngOnInit(): void {

    //Funcion para inicializar todos los componentes declarados en js en el index
    initFunctionMain();
    this.sidebarService.cargarMenu();
  }

}
