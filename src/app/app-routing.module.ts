import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importaciones de los componentes
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './auth/register/register.component';

//Creación de rutas
const routes: Routes = [
  //Rutas hijas
  {
    path:'',
    component: PagesComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'progress', component: ProgressComponent},
      {path: 'grafica1', component: Grafica1Component},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NopagefoundComponent}
];


@NgModule({
  declarations: [
  ],
  imports: [
    //Importando el modulo enviandole las rutas definidas
    RouterModule.forRoot(routes)
  ],
  exports: [
    //Exportación del modulo para poder utilizarlo en otras partes
    RouterModule
  ]
})
export class AppRoutingModule { }
