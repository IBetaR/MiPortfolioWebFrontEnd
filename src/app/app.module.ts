import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IniciarSessionComponent } from './componentes/iniciar-session/iniciar-session.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { Pagina404Component } from './componentes/pagina404/pagina404.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HAndSskillsComponent } from './componentes/h-and-sskills/h-and-sskills.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { HttpClientModule } from '@angular/common/http';
import { IdiomasComponent } from './componentes/idiomas/idiomas.component';
import { ReferenciasComponent } from './componentes/referencias/referencias.component';

@NgModule({
  declarations: [
    AppComponent,
    IniciarSessionComponent,
    PortfolioComponent,
    EncabezadoComponent,
    Pagina404Component,
    AcercaDeComponent,
    HAndSskillsComponent,
    EducacionComponent,
    ExperienciaComponent,
    PiePaginaComponent,
    ProyectosComponent,
    IdiomasComponent,
    ReferenciasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
