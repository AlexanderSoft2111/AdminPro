import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';

//Importaciones de los componentes
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages.routing';


//Creación de rutas
const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: NopagefoundComponent}
];


@NgModule({

  imports: [
    //Importando el modulo enviandole las rutas definidas
    RouterModule.forRoot(routes)
  ],
  exports: [
    //Exportación del modulo para poder utilizarlo en otras partes
    RouterModule,

    //rutas de las paginas
    PagesRoutingModule,

    //rutas de la autenticación
    AuthRoutingModule
  ]
})
export class AppRoutingModule { }
