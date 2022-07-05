import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuario().then(resp => console.log(resp));
/* 
    const promesa = new Promise( (resolve, reject) => {
      
      if(false){

        resolve('Hola mundo');
      }
      reject('algo salio mal');


    });

    promesa
      .then(resp => console.log(resp))
      .catch(err => console.log(err));

    console.log('Fin de la promesa'); */

  }

  getUsuario(){

    return new Promise((resolve) => {

      fetch('https://pokeapi.co/api/v2/pokemon')
        .then(resp => resp.json())
        .then(body => resolve(body.results))
    });

  }
  
}
