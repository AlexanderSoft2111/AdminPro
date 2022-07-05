import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  titulo?: string;
  getParametrosRutasSubs$?: Subscription;

  constructor(public router: Router) { 

    //Igualamos una propiedad de la clase al observable
      this.getParametrosRutasSubs$ = this.getParametrosRutas().subscribe(({titulo}) => {
        this.titulo = titulo;
        //Insertamos el titulo en la etiqueta title del html
        document.title = `AdminPro - ${titulo}`;
      });

  }

  ngOnDestroy(): void {
    //Nos desubcribimos del observable
    this.getParametrosRutasSubs$?.unsubscribe();
  }

  getParametrosRutas(){

    //Con este metodo accedemos al evento que contiene la data definida en las rutas
    return this.router.events
      .pipe(
        //Filtramos primero para ver solo las instancias del ActivationEnd 
        filter((event:any) => event instanceof ActivationEnd),
        //Filtramos aquellos que tenga la porpiedad firstChild en null
        filter((event:ActivationEnd) => event.snapshot.firstChild === null),
        //Devolvemos solo la información de la data
        map((event:ActivationEnd) => event.snapshot.data),
      );
  }

}
