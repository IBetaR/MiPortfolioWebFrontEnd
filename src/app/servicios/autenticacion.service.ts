import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { config } from '../data/config/Config';
import { IniciarSesionDto } from '../data/IniciarSesionDto';

@Injectable({ 
  providedIn: 'root'
})
export class AutenticacionService {
  
  constructor(private http:HttpClient) {}
    
   IniciarSesion(credentials: IniciarSesionDto): Observable<boolean>{
     return this.http.post<boolean>(config.baseUrl + "/iniciar-session", credentials).pipe(
       tap((response:boolean)=>{
         if(response)
         sessionStorage.setItem("usuario","ilichbr@gmail.com");
       })
     );
       //return data;
   }
   public logout(){
     sessionStorage.removeItem("usuario");
   }

   public isUserLogged(): boolean{
     return sessionStorage.getItem("usuario") != null;

   }

}
