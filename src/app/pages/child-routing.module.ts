import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RjxsComponent } from './rjxs/rjxs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BuscarComponent } from './buscar/buscar.component';
import { AdminGuard } from '../guards/admin.guard';

const routesChild: Routes = [
      {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
      {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress Bar'}},
      {path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica #1'}},
      {path: 'account-settings', component: AccoutSettingsComponent, data: {titulo: 'Ajustes de cuenta'}},
      {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
      {path: 'rxjs', component: RjxsComponent, data: {titulo: 'Rxjs'}},
      {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil'}},

      //Mantenimientos
      {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'hospitales'}},
      {path: 'medicos', component: MedicosComponent, data: {titulo: 'medicos'}},
      {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'medico'}},
      
      //Rutas Administrador
      {path: 'usuarios', canActivate: [AdminGuard],component: UsuariosComponent, data: {titulo: 'usuarios'}},
      
      //busqueda global
      {path: 'buscar/:termino', component: BuscarComponent, data: {titulo: 'busqueda'}}
]


@NgModule({
  imports: [
    //Importando el modulo enviandole las rutas definidas
    RouterModule.forChild(routesChild)
  ],
  exports: [
    //Exportación del modulo para poder utilizarlo en otras partes
    RouterModule
  ]
})
export class ChildRoutingModule { }
