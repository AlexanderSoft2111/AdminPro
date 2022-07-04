import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  
  //Se colocar dentro del input el nombre para renombrar la variable
  //@Input('valor') progreso: number = 80;
  @Input('valorEnvio') progreso: number = 80;
  @Input() btnClass: string = 'btn-primary';
  
  //Para enviar un valor al padre, se realiza con un evento y hay que color el tipo de valor que vamos a retornar
  @Output('valorRecibo') cambioProgreso: EventEmitter<number> = new EventEmitter();
  
  get getPorcentaje(){
    return `${this.progreso}%`
  }

  //Inicializo la propiedad de mi clase para colocarle las dos clases que necesita
  ngOnInit() {

    this.btnClass = `btn ${this.btnClass}`

  }

  cambiarValor(valor: number){

    if(this.progreso >= 100 && valor>=0){
      this.cambioProgreso.emit(100);
      return this.progreso = 100;
    }
    
    if(this.progreso <= 0 && valor<0){
      this.cambioProgreso.emit(0);
      return this.progreso = 0;
    }
    
    this.progreso = this.progreso + valor;
    this.cambioProgreso.emit(this.progreso);
    return this.progreso;
  }

  onChange(valorCaja: number){

    if(valorCaja >= 100){
      this.progreso = 100;
    } else if(valorCaja <= 0){
      this.progreso = 0
    } else {
      this.progreso = valorCaja;
    }

    this.cambioProgreso.emit(this.progreso);

  }
}
