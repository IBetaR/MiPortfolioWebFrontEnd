import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../data/Educacion';
import { Experiencia } from '../data/Experiencia';
import { config } from '../data/config/Config';
import { HaSs } from '../data/HaSs';
import { Idiomas } from '../data/Idiomas';
import { Proyectos } from '../data/Proyectos';
import { Referencias } from '../data/Referencias';
import { AcercaDe } from '../data/AcercaDe';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { }
      //encabezado

    //logout(): Observable<any>{
     // return this.http.get<any>(config.baseUrl+"iniciar-session")
    //}



      //AcercaDe


   obtenerDatos(): Observable<any> {
    return this.http.get<any>('./assets/data/data.json');
    
  }

   obtenerDatosAcercaDe(): Observable<AcercaDe[]> {
    return this.http.get<any>(config.baseUrl+ "acercade");
    
  }
  guardarNuevoAcercaDe(acercade: AcercaDe): Observable<AcercaDe>{
    return this.http.post<any>(config.baseUrl + "acercade/crear", acercade);
  }

  modificarAcercaDe (acercade: AcercaDe): Observable<any>{
    return this.http.put<any>(config.baseUrl + "acercade/actualizar", acercade)
  }
  borrarAcercaDe (id: number): Observable<any>{
    return this.http.delete<any>(config.baseUrl + "acercade/borrar/" + id);
  }

      // Educacion

  obtenerDatosEducacion(): Observable<Educacion[]> {
    return this.http.get<any>(config.baseUrl + "educacion");
    
  }
  guardarNuevaEducacion(educacion: Educacion): Observable<Educacion>{
    return this.http.post<any>(config.baseUrl + "educacion/crear", educacion);
    //aca va con rutas creadas en el controller del backend
  }
  modificarEducacion (educacion: Educacion): Observable<any>{
    return this.http.put<any>(config.baseUrl + "educacion/actualizar", educacion)
  }
  borrarEducacion (id: number): Observable<any>{
    return this.http.delete<any>(config.baseUrl + "educacion/borrar/" + id);
  }
        // Experiencia

  obtenerDatosExperiencia(): Observable<Experiencia[]> {
    return this.http.get<any>(config.baseUrl + "experiencia");
    
  }
  guardarNuevaExperiencia(experiencia: Experiencia): Observable<Experiencia>{
    return this.http.post<any>(config.baseUrl + "experiencia/crear", experiencia);
    //aca va con rutas creadas en el controller del backend
  }
  modificarExperiencia (experiencia: Experiencia): Observable<any>{
    return this.http.put<any>(config.baseUrl + "experiencia/actualizar", experiencia)
  }
  borrarExperiencia (id: number): Observable<any>{
    return this.http.delete<any>(config.baseUrl + "experiencia/borrar/" + id);
  }
          // HaSs
   obtenerDatosHaSs(): Observable<HaSs[]> {
    return this.http.get<any>(config.baseUrl + "habilidades");
    
  }
  guardarNuevaHaSs(habilidad: HaSs): Observable<HaSs>{
    return this.http.post<any>(config.baseUrl + "habilidades/crear", habilidad);
    //aca va con rutas creadas en el controller del backend
  }
  modificarHaSs (habilidad: HaSs): Observable<any>{
    return this.http.put<any>(config.baseUrl + "habilidades/actualizar", habilidad)
  }
  borrarHaSs (id: number): Observable<any>{
    return this.http.delete<any>(config.baseUrl + "habilidades/borrar/" + id);
  }

        // Idiomas

  obtenerDatosIdiomas(): Observable<Idiomas[]> {
        return this.http.get<any>(config.baseUrl + "idiomas");
        
      }
  guardarNuevaIdiomas(idioma: Idiomas): Observable<Idiomas>{
        return this.http.post<any>(config.baseUrl + "idiomas/crear", idioma);
        //aca va con rutas creadas en el controller del backend
      }
  modificarIdiomas (idioma: Idiomas): Observable<any>{
        return this.http.put<any>(config.baseUrl + "idiomas/actualizar", idioma)
      }
  borrarIdiomas (id: number): Observable<any>{
        return this.http.delete<any>(config.baseUrl + "idiomas/borrar/" + id);
      }
          // Proyectos

  obtenerDatosProyectos(): Observable<Proyectos[]> {
  return this.http.get<any>(config.baseUrl + "proyectos");
    
  }
  guardarNuevoProyectos(proyecto: Proyectos): Observable<Proyectos>{
    return this.http.post<any>(config.baseUrl + "proyectos/crear", proyecto);
    //aca va con rutas creadas en el controller del backend
  }
  modificarProyectos (proyecto: Proyectos): Observable<any>{
    return this.http.put<any>(config.baseUrl + "proyectos/actualizar", proyecto)
  }
  borrarProyectos (id: number): Observable<any>{
    return this.http.delete<any>(config.baseUrl + "proyectos/borrar/" + id);
  }

          //Referencias
  obtenerDatosReferencias(): Observable<Referencias[]> {
    return this.http.get<any>(config.baseUrl + "referencias");
    
  }
  guardarNuevaReferencias(referencia: Referencias): Observable<Referencias>{
    return this.http.post<any>(config.baseUrl + "referencias/crear", referencia);
    //aca va con rutas creadas en el controller del backend
  }
  modificarReferencias (referencia: Referencias): Observable<any>{
    return this.http.put<any>(config.baseUrl + "referencias/actualizar", referencia)
  }
  borrarReferencias (id: number): Observable<any>{
    return this.http.delete<any>(config.baseUrl + "referencias/borrar/" + id);
  }
 
}
