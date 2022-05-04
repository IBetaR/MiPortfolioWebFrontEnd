import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from './servicios/autenticacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MiPortfolioWeb';
  isUserLogged: boolean = false;

  constructor (private autenticacionService : AutenticacionService){}

  ngOnInit(): void {
    this.isUserLogged = this.autenticacionService.isUserLogged();
  }
}
