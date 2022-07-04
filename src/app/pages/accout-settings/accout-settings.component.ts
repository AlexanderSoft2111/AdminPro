import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: [
  ]
})
export class AccoutSettingsComponent implements OnInit {

  public linksHtml?: NodeListOf<Element>;
  constructor(public settingsService: SettingsService) { }

  ngOnInit(): void {

    //Obtenemos todos los elementos con esa clase
    this.linksHtml = document.querySelectorAll('.selector');

    this.settingsService.dibujarCheck(this.linksHtml);
    
  }
  
  seleccionarTema(tema: string){
    
    this.settingsService.seleccionarTema(tema);

  }

}
