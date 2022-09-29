import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importaciones de los componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RjxsComponent } from './rjxs/rjxs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';




//Creación de rutas
const routes: Routes = [
  //Rutas hijas
  {
    path:'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
      {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress Bar'}},
      {path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica #1'}},
      {path: 'account-settings', component: AccoutSettingsComponent, data: {titulo: 'Ajustes de cuenta'}},
      {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
      {path: 'rxjs', component: RjxsComponent, data: {titulo: 'Rxjs'}},
      {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil'}},

      //Mantenimientos
      {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'usuarios'}},
      {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'hospitales'}},
      {path: 'medicos', component: MedicosComponent, data: {titulo: 'medicos'}},
      {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'medico'}}
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
