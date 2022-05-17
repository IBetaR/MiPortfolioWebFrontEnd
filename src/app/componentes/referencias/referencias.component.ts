import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Referencias } from 'src/app/data/Referencias';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.css']
})
export class ReferenciasComponent implements OnInit {
  //referenciaList: any;

  referenciaList: Referencias[] = [];
  isUserLogged: Boolean = false;

  referenciaForm: FormGroup;

  constructor(
    private datosportfolio: PortfolioService,
    private autenticacionService: AutenticacionService,
    private formBuilder: FormBuilder) {

    this.referenciaForm = this.formBuilder.group({
      id: [''],
      nombrecompleto: ['', [Validators.required]],
      linkedin: ['', [Validators.required]],
      otrodato: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {

    this.isUserLogged = this.autenticacionService.isUserLogged();
    this.reloadData();

    //this.datosportfolio.obtenerDatos().subscribe(data=>{
      //this.referenciaList=data.referencia;
    //})
    

  }

  private reloadData() {
    this.datosportfolio.obtenerDatosReferencias().subscribe(
      (data) => {
        this.referenciaList = data;
      }
    )
  }

  private clearForm() {
    this.referenciaForm.setValue({
      id: '',
      nombrecompleto: '',
      linkedin: '',
      otrodato: '',
    })

  }

  private loadForm(referencia: Referencias) {
    this.referenciaForm.setValue({
      id: referencia.id,
      nombrecompleto: referencia.nombrecompleto,
      linkedin: referencia.linkedin,
      otrodato: referencia.otrodato,
    })
  }

  onSubmit() {
    let referencia: Referencias = this.referenciaForm.value;
    if (this.referenciaForm.get('id')?.value == '') {
      this.datosportfolio.guardarNuevaReferencias(referencia).subscribe(
        (nuevaReferencia: Referencias) => {
          this.referenciaList.push(nuevaReferencia);
        }
      );
    } else {
      this.datosportfolio.modificarReferencias(referencia).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNuevaReferencia() {
    this.clearForm();
  }
  onEditarReferencia(index: number) {
    let referencia: Referencias = this.referenciaList[index];
    this.loadForm(referencia);

  }

  onBorrarReferencia(index: number) {
    let referencia: Referencias = this.referenciaList[index];
    if (confirm("¿Está seguro de esta acción?")) {
      this.datosportfolio.borrarReferencias(referencia.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }


}
