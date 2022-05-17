import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-iniciar-session',
  templateUrl: './iniciar-session.component.html',
  styleUrls: ['./iniciar-session.component.css']
})
export class IniciarSessionComponent implements OnInit {

  //usuario: string = "ilichbr@gmail.com";
  //password: string = "password";


  form: FormGroup;
  loginError: Boolean = false;

  constructor(

    private autenticacionService: AutenticacionService,
    private ruta:Router,
    private formBuilder: FormBuilder
      
    ) {
    this.form = this.formBuilder.group
    (
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],

      }
    )
  }

  ngOnInit(): void {

  }

  onSubmit(event:Event){
    event.preventDefault;

    this.autenticacionService.IniciarSesion(this.form.value).subscribe(
      (response: Boolean) => {
        if (response)
          this.ruta.navigate(['/portfolio']);
          else
          console.log("Error de validación")
          this.loginError = true;

      }
          //data=>{
          // console.log("DATA:" + JSON.stringify(data));
          // this.ruta.navigate(['/porfolio'])
          //}
    )
  }

  get Email() {
    return this.form.get('email');
  }
  get Password() {
    return this.form.get('password');
  }

}
