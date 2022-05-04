import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcercaDe } from 'src/app/data/AcercaDe';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  acercaDeList:AcercaDe []=[];
  isUserLogged: Boolean = false;

  acercaDeForm:FormGroup;

  constructor(
  
    private autenticacionService : AutenticacionService,
    private datosPortfolio : PortfolioService,
    private formBuilder : FormBuilder) {

      this.acercaDeForm = this.formBuilder.group({
        id: [''],
        nombrecompleto: ['', [Validators.required]],
        titulo: ['', [Validators.required]],
        resumencv: ['', [Validators.required]],
        imagenperfil: ['', [Validators.required]],
      
      })

     }
    ngOnInit(): void {
      this.isUserLogged = this.autenticacionService.isUserLogged();
      this.reloadData();
  
    }

    private reloadData(){
      this.datosPortfolio.obtenerDatosAcercaDe().subscribe(
        (data) => {
          this.acercaDeList = data;
        });
    }

    private clearForm(){
      this.acercaDeForm.setValue({
        id: '',
        nombrecompleto: '',
        titulo: '',
        resumencv:'',
        imagenperfil:'',
      })
    }

    private loadForm(acercade : AcercaDe){
      this.acercaDeForm.setValue({
        id: acercade.id,
        nombrecompleto: acercade.nombrecompleto,
        titulo: acercade.titulo,
        resumencv:acercade.resumencv,
        imagenperfil:acercade.imagenperfil,
      })
    }

    onSubmit(){
      let acercade: AcercaDe = this.acercaDeForm.value;
      if(this.acercaDeForm.get('id')?.value==''){
        this.datosPortfolio.guardarNuevoAcercaDe(acercade).subscribe(
          (nuevoAcercaDe: AcercaDe) =>{
            this.acercaDeList.push(nuevoAcercaDe);
          }
        );
        }else{
            this.datosPortfolio.modificarAcercaDe(acercade).subscribe(
              ()=>{
                this.reloadData();
               }
             )
          }
      }
      onNuevoAcercaDe() {
        this.clearForm();
      }

      onEditarAcercaDe(index: number) {
        let acercade: AcercaDe = this.acercaDeList[index];
        this.loadForm(acercade);
    
      }

      onBorrarAcercaDe(index: number) {
        let acercade: AcercaDe = this.acercaDeList[index];
        if (confirm("¿Está seguro de esta acción?")) {
          this.datosPortfolio.borrarAcercaDe(acercade.id).subscribe(
            () => {
              this.reloadData();
            }
          )
        }
      }

}
