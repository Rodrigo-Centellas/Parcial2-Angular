import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Horario } from "app/models/horario";
import { API_URL } from "app/utilities/config";


@Injectable({
    providedIn: 'root'
  })
  export class HorarioService{
    constructor(private http: HttpClient, private authService: AuthService) { }

    getHorarios(): Observable<Horario[]> {
        return this.http.get<Horario[]>(`${API_URL}/horarios`, this.authService.getHeaders());
      }
    
      createHorarios(horario: Horario): Observable<Horario> {
        return this.http.post<Horario>(`${API_URL}/horarios`, horario, this.authService.getHeaders());
      }
    
      updateHorarios(id: number, horarioData: Horario): Observable<Horario> {
        return this.http.put<Horario>(`${API_URL}/horarios/${id}`, horarioData, this.authService.getHeaders());
    }
    
    
      deleteHorarios(id: number): Observable<Horario> {
        const url = `${API_URL}/horarios/${id}`;
        return this.http.delete<Horario>(url, this.authService.getHeaders());
      }
  }