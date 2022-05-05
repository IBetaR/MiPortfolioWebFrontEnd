import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HaSs } from 'src/app/data/HaSs';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';


@Component({
  selector: 'app-h-and-sskills',
  templateUrl: './h-and-sskills.component.html',
  styleUrls: ['./h-and-sskills.component.css']
})
export class HAndSskillsComponent implements OnInit { 
  hassList: HaSs [] = [];
  isUserLogged: Boolean = false;

  hassForm: FormGroup;

  constructor(
    
    private datosPortfolio: PortfolioService,
    private autenticacionService: AutenticacionService,
    private formBuilder: FormBuilder) {

      this.hassForm = this.formBuilder.group({
       id: [''],
       nombre: ['', [Validators.required]],
        porcentaje: ['', [Validators.required]],
      })

   }

    ngOnInit(): void {

      this.datosPortfolio.obtenerDatos().subscribe(data=>{
        this.hassList=data.habilidad;
      })
      //this.isUserLogged = this.autenticacionService.isUserLogged();
      //this.reloadData();

    }


    private reloadData() {
      this.datosPortfolio.obtenerDatosHaSs().subscribe
        (data => {
          this.hassList = data;
        });
    }

    private clearForm() {
      this.hassForm.setValue({
        id: '',
        nombre: '',
        porcentaje: '',
      })
    }

    private loadForm(habilidad: HaSs) {
      this.hassForm.setValue({
        id: habilidad.id,
        nombre: habilidad.nombre,
        porcentaje: habilidad.porcentaje,
      })
    }

    onSubmit() {
      let habilidad: HaSs = this.hassForm.value;
      if (this.hassForm.get('id')?.value == '') {
        this.datosPortfolio.guardarNuevaHaSs(habilidad).subscribe(
          (nuevaHaSs: HaSs) => {
            this.hassList.push(nuevaHaSs);
          }
        );
      } else {
        this.datosPortfolio.modificarHaSs(habilidad).subscribe(
          () => {
            this.reloadData();
          }
        )
      }
    }

    onNuevaHaSs() {
      this.clearForm();
    }
  
    onEditHaSs(index: number) {
      let habilidad: HaSs = this.hassList[index];
      this.loadForm(habilidad);
    }
  
    onDeleteHaSs(index: number) {
      let habilidad: HaSs = this.hassList[index];
      if (confirm("¿Está seguro que desea borrar la habilidad seleccionada?")) {
        this.datosPortfolio.borrarHaSs(habilidad.id).subscribe(
          () => {
            this.reloadData();
          }
        )
      }
    }

}
