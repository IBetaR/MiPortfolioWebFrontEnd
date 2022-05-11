import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  encabezado:any;
  //encabezado ='encabezado';
  //miPortfolio: any;

  constructor(
    
    private datosPortfolio : PortfolioService,
    private ruta:Router, ) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data=>{
      this.encabezado=data.encabezado;
    })
  }

  public logout(){
    
    this.ruta.navigate(['/iniciar-session']);
    sessionStorage.removeItem("usuario");
  }


      //Cerrar sesión
      
  //onSubmit(event:Event){
    //event.preventDefault;

   // return this.
      
  //}



}
