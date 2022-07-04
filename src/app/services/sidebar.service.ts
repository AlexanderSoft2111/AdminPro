import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      subMenu: [
        {
          titulo: 'Dashboard',
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
      ]
    }
  ]

  constructor() { }
}
