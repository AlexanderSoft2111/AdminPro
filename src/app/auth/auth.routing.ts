import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importaciones de los componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';





//Creación de rutas
const routes: Routes = [
  //Rutas hijas
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];


@NgModule({

  imports: [
    //Importando el modulo enviandole las rutas definidas
    RouterModule.forRoot(routes)
  ],
  exports: [
    //Exportación del modulo para poder utilizarlo en otras partes
    RouterModule
  ]
})
export class AuthRoutingModule { }
