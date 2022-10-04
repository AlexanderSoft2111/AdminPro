import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  constructor(private router: Router){}

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];
    
    if(this.menu.length === 0){

        this.router.navigateByUrl('/login');
    }
  }

/*   menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      subMenu: [
        {
          titulo: 'Main',
          url: '/'
        },
        {
          titulo: 'Progress',
          url: 'progress'
        },
        {
          titulo: 'Gráfica',
          url: 'grafica1'
        },
        {
          titulo: 'Promesas',
          url: 'promesas'
        },
        {
          titulo: 'Rxjs',
          url: 'rxjs'
        }
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      subMenu: [
        {
          titulo: 'Usuarios',
          url: 'usuarios'
        },
        {
          titulo: 'Medicos',
          url: 'medicos'
        },
        {
          titulo: 'Hospitales',
          url: 'hospitales'
        }
      ]
    }
  ] */
}
