import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AulaClase } from '../models/aula_clase';
import { API_URL_API } from '../utilities/config';

@Injectable({
  providedIn: 'root'
})
export class AulaClaseService {
  private apiUrl = `${API_URL_API}/aula_clase`;

  constructor(private http: HttpClient) { }

  getAulaClases(): Observable<AulaClase[]> {
    return this.http.get<AulaClase[]>(this.apiUrl, this.getHeaders());
  }

  createAulaClase(aulaClase: AulaClase): Observable<AulaClase> {
    return this.http.post<AulaClase>(this.apiUrl, aulaClase, this.getHeaders());
  }

  updateAulaClase(id: number, aulaClase: AulaClase): Observable<AulaClase> {
    return this.http.put<AulaClase>(`${this.apiUrl}/${id}`, aulaClase, this.getHeaders());
  }

  deleteAulaClase(id: number): Observable<void> {
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
