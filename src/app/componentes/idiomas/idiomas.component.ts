import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Idiomas } from 'src/app/data/Idiomas';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
          })


export class IdiomasComponent implements OnInit {

  idiomasList: Idiomas[] = [];
  isUserLogged: Boolean = false;

  idiomasForm: FormGroup;


  constructor(
    private datosPortfolio: PortfolioService,
    private autenticacionService: AutenticacionService,
    private formBuilder: FormBuilder) {

      this.idiomasForm = this.formBuilder.group({ 

        id: [''],
        idioma: ['', [Validators.required]],
        nivel: ['', [Validators.required]],
        habla: ['', [Validators.required]],
        lee: ['', [Validators.required]],
        escribe: ['', [Validators.required]],
      });

     }
    

     ngOnInit(): void {

      //this.datosPortfolio.obtenerDatos().subscribe(data=>{
        //this.idiomasList=data.idioma;
      //})
      this.isUserLogged = this.autenticacionService.isUserLogged();
      
      this.reloadData();
    }

    private reloadData() {
      this.datosPortfolio.obtenerDatosIdiomas().subscribe(
        (data) => {
          this.idiomasList = data;
        }
      );
    }

    private clearForm() {
      this.idiomasForm.setValue({
        id: '',
        idioma: '',
        nivel: '',
        habla: '',
        lee: '',
        escribe: '',
      })
    }

    private loadForm(idiomas: Idiomas) {
      this.idiomasForm.setValue({
        id: idiomas.id,
        idioma: idiomas.idioma,
        nivel: idiomas.nivel,
        habla: idiomas.habla,
        lee: idiomas.lee,
        escribe: idiomas.escribe,
      })
    }

    onSubmit(){
      let idiomas:Idiomas = this.idiomasForm.value;
      if (this.idiomasForm.get('id')?.value==''){
        this.datosPortfolio.guardarNuevaIdiomas(idiomas).subscribe(
          (nuevoIdioma: Idiomas) =>{
            this.idiomasList.push(nuevoIdioma);
          }
        )
      }else{
        this.datosPortfolio.modificarIdiomas(idiomas).subscribe(
          () =>{
            this.reloadData();
          }
        )
      }
    }
    onNuevaIdioma(){
      this.clearForm();
    }

    onEditIdioma(index:number){
      let idioma: Idiomas=this.idiomasList[index];
      this.loadForm(idioma);
    }
    onDeleteIdioma(index:number){
      let idioma: Idiomas=this.idiomasList[index];
      if (confirm("Esta Seguro de esta acción? Eliminará el idioma del formulario")){
        this.datosPortfolio.borrarIdiomas(idioma.id).subscribe(
          ()=>{
            this.reloadData();
          }
        )
      }
    }



  
}
