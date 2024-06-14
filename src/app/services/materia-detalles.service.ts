import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MateriaDetalles } from '../models/materia-detalles';
import { API_URL_API } from 'app/utilities/config';
@Injectable({
  providedIn: 'root'
})
export class MateriaDetallesService {
  private apiUrl = `${API_URL_API}/materia-detalles`;

  constructor(private http: HttpClient) {}

  getMateriaDetalles(): Observable<MateriaDetalles[]> {
    return this.http.get<MateriaDetalles[]>(this.apiUrl, this.getHeaders());
  }

  createMateriaDetalles(materiaDetalles: MateriaDetalles): Observable<MateriaDetalles> {
    return this.http.post<MateriaDetalles>(this.apiUrl, materiaDetalles, this.getHeaders());
  }

  updateMateriaDetalles(id: number, materiaDetalles: MateriaDetalles): Observable<MateriaDetalles> {
    return this.http.put<MateriaDetalles>(`${this.apiUrl}/${id}`, materiaDetalles, this.getHeaders());
  }

  deleteMateriaDetalles(id: number): Observable<void> {
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
