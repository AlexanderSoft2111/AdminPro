import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formSubmited: boolean = false;

  public registerForm = this.fb.group({
    nombre: ['Alexander', Validators.required],
    email: ['test16@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [true, Validators.required],
  }, {
    validators: this.passwordIguales('password','password2') //Declaramos validaciones personalizadas
  });

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService) { }

  crearUsuario(){
    this.formSubmited = true;
    
    if(this.registerForm.invalid){
      return
    }
    
    this.usuarioService.crearUsuario(this.registerForm.value)
        .subscribe({
          next: res => {
            console.log('Usuario creado');
            console.log(res);
          },
          error: err => {
            Swal.fire('Error', err.error.msg, 'error');
          }
        });
        /* .subscribe(res => {
          console.log('Usuario creado');
          console.log(res);
        }, (err) => console.warn(err.error.msg); */


  }

  campoValido(campo: string):boolean{

    if(this.registerForm.get(campo)?.invalid && this.formSubmited){
      return true
    } else{
      return false
    }
  }

  contrasenasNoValidas():boolean{
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    
    if(pass1 !== pass2 && this.formSubmited){
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmited
  }

  //Declaramos el tipo del formulario para realizar las validaciones
  passwordIguales(pass1Name: string, pass2Name: string){

    return (formGroup: FormGroup) => {

      const pass1 = formGroup.get(pass1Name);
      const pass2 = formGroup.get(pass2Name);

      if( pass1?.value === pass2?.value ){
        pass2?.setErrors(null);
      } else {
        pass2?.setErrors({noEsIgual: true});
      }

    }
  }

}
