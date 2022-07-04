import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public linkTema = document.querySelector('#theme');
  public linksHtml?: NodeListOf<Element>;

  constructor() {
    
    const url = localStorage.getItem('url') || './assets/css/colors/default-dark.css';

    //Establece o reemplaza el atributo href del elemento
    this.linkTema?.setAttribute('href', url);

    //this.dibujarCheck();
   }

  seleccionarTema(tema: string){

    const url = `./assets/css/colors/${ tema }.css`;

    //Reemplazamos el atributo y colocamos el nuevo
    this.linkTema?.setAttribute('href',url);

    //Guardamos en el localStorage
    localStorage.setItem('url', url);

    //Dibujamos el check
    if(this.linksHtml){
      this.dibujarCheck(this.linksHtml);
    }

  }

  dibujarCheck(linksHtml: NodeListOf<Element>){

    this.linksHtml = linksHtml;

    this.linksHtml?.forEach( linkHtml => {

      linkHtml.classList.remove('working');

      //Obtenemos la data de cada uno de los links
      const btnAtributoTema = linkHtml.getAttribute('data-theme');

      //Establecemos el link de comparacion
      const urlTema = `./assets/css/colors/${ btnAtributoTema }.css`;

      //Obtenemos la url del link que esta seleccionado
      const temaSeleccionado = this.linkTema?.getAttribute('href');
      
      if(urlTema === temaSeleccionado){

        //Agregamos la clase al elemento que coincide
        linkHtml.classList.add('working');
      }

    });

  }
}
