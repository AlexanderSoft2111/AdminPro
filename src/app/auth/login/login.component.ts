import { AfterViewInit, Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements AfterViewInit {

  //Referencia al button Html
  @ViewChild('googleBtn') googleBtn?: ElementRef;

  public inicarForm = this.fb.group({
    email: [localStorage.getItem('email') ||'', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    recordarme: [true, Validators.required],
  });


  constructor(private fb: FormBuilder,
              private router: Router,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  //Funcion para obtener el token de identificación de google
  googleInit(){
    
    google.accounts.id.initialize({
      client_id: "848089942836-0goh1u2rm22s9m18jncbe2027m0jm1um.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      this.googleBtn?.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any){
    //console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
        .subscribe({
          next: res => {
            //El gnzone se utiliza para hacer que angular no pierda el control cuando utiliza librerias de terceros para realizar una navegación como la de google
            this.ngZone.run(() => {

              this.router.navigateByUrl('/dashboard');
            });
          },
          error: err => {
            console.warn(err);
          }
        });
  }

  //Inicio de sesión normal
  login(){

      this.usuarioService.login(this.inicarForm.value)
      .subscribe({
        next: res => {
          if(this.inicarForm.get('recordarme')?.value){
            localStorage.setItem('email', this.inicarForm.get('email')?.value || '');
          } else {
            localStorage.removeItem('email');
          }
          this.router.navigateByUrl('/dashboard');
        },
        error: err => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      });

    
  }

}
