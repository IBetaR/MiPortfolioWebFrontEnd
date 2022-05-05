import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  encabezado:any;
  //encabezado ='encabezado';
  //miPortfolio: any;

  constructor(private datosPortfolio : PortfolioService ) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data=>{
      this.encabezado=data.encabezado;
    })
  }

}
