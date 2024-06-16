import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HorarioClase } from '../models/horario_clase';
import { API_URL_API } from '../utilities/config';

@Injectable({
  providedIn: 'root'
})
export class HorarioClaseService {
  private apiUrl = `${API_URL_API}/horario_clase`;

  constructor(private http: HttpClient) {}

  getHorarioClases(): Observable<HorarioClase[]> {
    return this.http.get<HorarioClase[]>(this.apiUrl, this.getHeaders());
  }

  createHorarioClase(horarioClase: HorarioClase): Observable<HorarioClase> {
    return this.http.post<HorarioClase>(this.apiUrl, horarioClase, this.getHeaders());
  }

  updateHorarioClase(id: number, horarioClase: HorarioClase): Observable<HorarioClase> {
    return this.http.put<HorarioClase>(`${this.apiUrl}/${id}`, horarioClase, this.getHeaders());
  }

  deleteHorarioClase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  private getHeaders() {
    const token = localStorage.getItem('jwtToken');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }
}
