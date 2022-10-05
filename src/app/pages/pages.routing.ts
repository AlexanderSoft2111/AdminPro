import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

//Importaciones de los componentes
import { PagesComponent } from './pages.component';





//Creación de rutas
const routes: Routes = [
  //Rutas hijas
  {
    path:'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./child-routing.module').then(m => m.ChildRoutingModule)//Llamamos a la carga perezosa del modulo en donde se encuentran las rutas hijas
  }
];


@NgModule({

  imports: [
    //Importando el modulo enviandole las rutas definidas
    RouterModule.forChild(routes)
  ],
  exports: [
    //Exportación del modulo para poder utilizarlo en otras partes
    RouterModule
  ]
})
export class PagesRoutingModule { }
