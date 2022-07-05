import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rjxs',
  templateUrl: './rjxs.component.html',
  styles: [
  ]
})
export class RjxsComponent implements OnDestroy{

  public retornaIntervaloSusb$?: Subscription;

  constructor() { 
    
      /*   Metodo para subscribirnos y escuchar los valores
        this.retornaObservable().pipe(
          numero de intentos que va a realizar ejecutar el observable por si sale un error
          retry(1)
        ).subscribe(
          valor => console.log('valor: ',valor),
          error => console.warn('error: ',error),
          () => console.info('Termino el subscribe')
          ); */
        this.retornaIntervaloSusb$ = this.retornaIntervalo().subscribe(console.log);


  }

  //Metodo para desubcribirnos y dejar de esuchar los valores cuando se elmina el componente
  ngOnDestroy(): void {
    this.retornaIntervaloSusb$?.unsubscribe();
  }


  retornaIntervalo():Observable<number>{

    //La funcion interval de rxjs devuelve un observable de numeros
    return interval(1000)
      //El pipe nos permite ejecutar mas funciones
           .pipe(
            //El take nos permite decirle hasta cuantos numero o intervalos necesitamos
              take(10),
              //El map nos permite transformar la información y devolver lo que necesitemos
              map(valor => valor + 1),
              //nos filtra la información y solo permite pasar lo que cumpla con la condición true
              filter(valor => (valor % 2 === 0) ?true :false)
           );
  }

  retornaObservable(): Observable<number>{
    let i = -1;
    //Declaramos un observable
    return new Observable<number>(subscriber => {

      //Funcion para ejecutar un codigo despues de cierto tiempo
      const interval = setInterval(() => {
          i++;
          //Enviamos el valor para poderlo recibir cuando nos susbcribimos
          subscriber.next(i);

        if(i === 4){
          //Limpiamos y finalizamos el interval
          clearInterval(interval);

          //Le decimos que finalice la susbcripcion
          subscriber.complete();
        }
        
        if(i === 2){
          clearInterval(interval);
          //Le enviamos un valor cuando algo sale mal
          subscriber.error('Algo salió mal');
        }

      },1000)
    });
  }

}
