import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSessionComponent } from './componentes/iniciar-session/iniciar-session.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';

import { Pagina404Component } from './componentes/pagina404/pagina404.component';

const routes: Routes = [
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'iniciar-session', component: IniciarSessionComponent },
  { path: '',redirectTo:'portfolio', pathMatch: 'full'},
  
  { path: '**', pathMatch:'full', component: Pagina404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
