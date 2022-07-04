import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importaciones de los componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';




//Creación de rutas
const routes: Routes = [
  //Rutas hijas
  {
    path:'dashboard',
    component: PagesComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'progress', component: ProgressComponent},
      {path: 'grafica1', component: Grafica1Component},
      {path: 'account-settings', component: AccoutSettingsComponent}
    ]
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
