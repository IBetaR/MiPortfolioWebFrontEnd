import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Experiencia } from 'src/app/data/Experiencia';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})

export class ExperienciaComponent implements OnInit {
  experienciaList: Experiencia[] = [];

  isUserLogged: Boolean = false;

  experienciaForm: FormGroup;

  constructor(

    private datosPortfolio: PortfolioService,
    private autenticacionService: AutenticacionService,
    private formBuilder: FormBuilder) {

    this.experienciaForm = this.formBuilder.group({
      id: [''],
      cargo: ['', [Validators.required]],
      empresa: ['', [Validators.required]],
      descrip: ['', [Validators.required]],
      img: ['', [Validators.required]],
      modalidad: ['', [Validators.required]],
      inicio: ['', [Validators.required]],
      fin: ['', [Validators.required]],
      duracion: ['', [Validators.required]],

    });

  }

  ngOnInit(): void {

    this.isUserLogged = this.autenticacionService.isUserLogged();
    this.reloadData();
  }

  //Esta fue la primera edicion
  //this.datosPortfolio.obtenerDatosExperiencia().subscribe(data=>{
  // this.experienciaList=this.datosPortfolio;
  //})
  //}

  private reloadData() {
    this.datosPortfolio.obtenerDatosExperiencia().subscribe
      (data => {
        this.experienciaList = data;
      });
  }

  private clearForm() {
    this.experienciaForm.setValue({
      id: '',
      cargo: '',
      empresa: '',
      descrip: '',
      img: '',
      modalidad: '',
      inicio: '',
      fin: '',
      duracion: '',
    })
  }

  private loadForm(experiencia: Experiencia) {
    this.experienciaForm.setValue({

      id: experiencia.id,
      cargo: experiencia.cargo,
      empresa: experiencia.empresa,
      descrip: experiencia.descrip,
      img: experiencia.img,
      modalidad: experiencia.modalidad,
      inicio: experiencia.inicio,
      fin: experiencia.fin,
      duracion: experiencia.duracion,

    })
  }
  onSubmit() {
    let experiencia: Experiencia = this.experienciaForm.value;
    if (this.experienciaForm.get('id')?.value == '') {
      this.datosPortfolio.guardarNuevaExperiencia(experiencia).subscribe(
        (nuevaExperiencia: Experiencia) => {
          this.experienciaList.push(nuevaExperiencia);
        }
      );
    } else {
      this.datosPortfolio.modificarExperiencia(experiencia).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNuevaExperiencia() {
    this.clearForm();
  }

  onEditarExperiencia(index: number) {
    let experiencia: Experiencia = this.experienciaList[index];
    this.loadForm(experiencia);

  }

  onBorrarExperiencia(index: number) {
    let experiencia: Experiencia = this.experienciaList[index];
    if (confirm("¿Está seguro de esta acción?")) {
      this.datosPortfolio.borrarExperiencia(experiencia.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

}
