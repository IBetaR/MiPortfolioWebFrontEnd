import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Educacion } from 'src/app/data/Educacion';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  educacionList:any;
  //educacionList: Educacion[] = [];
  isUserLogged: Boolean = false;

  educacionForm: FormGroup;

  constructor(
    private datosPortfolio: PortfolioService,
    private autenticacionService: AutenticacionService,
    private formBuilder: FormBuilder) {

    this.educacionForm = this.formBuilder.group({
      id: [''],
      centro: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      descrip: ['', [Validators.required]],
      img: ['', [Validators.required]],
      puntaje: ['', [Validators.required]],
      inicio: ['', [Validators.required]],
      fin: ['', [Validators.required]],
      status: ['', [Validators.required]],
      url: ['', [Validators.required]],

    });

  }


  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data=>{
      this.educacionList = data.educacion;
    });

    //this.isUserLogged = this.autenticacionService.isUserLogged();
    //this.reloadData();
  }
  private reloadData() {
    this.datosPortfolio.obtenerDatosEducacion().subscribe
      (data => {
        this.educacionList = data;
      });
  }

  private clearForm() {
    this.educacionForm.setValue({
      id: '',
      centro: '',
      titulo: '',
      descrip: '',
      img: '',
      puntaje: 0,
      inicio: '',
      fin: '',
      status: '',
      url: '',
    })
  }

  private loadForm(educacion: Educacion) {
    this.educacionForm.setValue({
      id: educacion.id,
      centro: educacion.centro,
      titulo: educacion.titulo,
      descrip: educacion.descrip,
      img: educacion.img,
      puntaje: educacion.puntaje,
      inicio: educacion.inicio,
      fin: educacion.fin,
      status: educacion.status,
      url: educacion.url,
    })
  }

  onSubmit() {
    let educacion: Educacion = this.educacionForm.value;
    if (this.educacionForm.get('id')?.value == '') {
      this.datosPortfolio.guardarNuevaEducacion(educacion).subscribe(
        (nuevaEducacion: Educacion) => {
          this.educacionList.push(nuevaEducacion);
        }
      )
    } else {
      this.datosPortfolio.modificarEducacion(educacion).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNuevaEducacion() {
    this.clearForm();
  }

  onEditarEducacion(index: number) {
    let educacion: Educacion = this.educacionList[index];
    this.loadForm(educacion);

  }

  onBorrarEducacion(index: number) {
    let educacion: Educacion = this.educacionList[index];
    if (confirm("¿Está seguro de esta acción?")) {
      this.datosPortfolio.borrarEducacion(educacion.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }
}



