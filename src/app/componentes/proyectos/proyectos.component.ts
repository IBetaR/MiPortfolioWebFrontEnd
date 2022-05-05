import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Proyectos } from 'src/app/data/Proyectos';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectosList: Proyectos[] = [];
  isUserLogged: Boolean = false;

  proyectosForm: FormGroup;

  constructor(
    private datosPortfolio: PortfolioService,
    private autenticacionService: AutenticacionService,
    private formBuilder: FormBuilder) {

    this.proyectosForm = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {

    this.datosPortfolio.obtenerDatos().subscribe(data=>{
      this.proyectosList=data.proyecto;
    })

    //this.isUserLogged = this.autenticacionService.isUserLogged();
    //this.reloadData();
  }

  private reloadData() {
    this.datosPortfolio.obtenerDatosProyectos().subscribe(
      (data) => {
        this.proyectosList = data;
      }
    );
  }

  private clearForm() {
    this.proyectosForm.setValue({
      id: '',
      nombre: '',
      descripcion: '',
    })
  }

  private loadForm(proyecto: Proyectos) {
    this.proyectosForm.setValue({
      id: proyecto.id,
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
    })
  }

  onSubmit() {
    let proyecto: Proyectos = this.proyectosForm.value;
    if (this.proyectosForm.get('id')?.value == '') {
      this.datosPortfolio.guardarNuevoProyectos(proyecto).subscribe(
        (nuevoProyecto: Proyectos) => {
          this.proyectosList.push(nuevoProyecto);
        }
      );
    } else {
      this.datosPortfolio.modificarProyectos(proyecto).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

  onNuevoProyecto() {
    this.clearForm();
  }

  onEditarProyecto(index: number) {
    let proyecto: Proyectos = this.proyectosList[index];
    this.loadForm(proyecto);

  }

  onBorrarProyecto(index: number) {
    let proyecto: Proyectos = this.proyectosList[index];
    if (confirm("¿Está seguro de esta acción?")) {
      this.datosPortfolio.borrarProyectos(proyecto.id).subscribe(
        () => {
          this.reloadData();
        }
      )
    }
  }

} 
