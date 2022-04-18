import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-iniciar-session',
  templateUrl: './iniciar-session.component.html',
  styleUrls: ['./iniciar-session.component.css']
})
export class IniciarSessionComponent implements OnInit {
  form:FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.form=this.formBuilder.group(
      {
        email:['', [Validators.required, Validators.email]],
        password:['',[Validators.required, Validators.minLength(8)]],



      }
    )


  }

  ngOnInit(): void {
  }
  get Email()
  {
    return this.form.get('email');
  }
  get Password()
  {
    return this.form.get('password');
  }

}
