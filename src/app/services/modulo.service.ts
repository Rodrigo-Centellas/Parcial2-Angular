import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modulo } from '../models/modulo';
import { API_URL_API } from 'app/utilities/config';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
 
  private apiUrl = `${API_URL_API}/modulos`;

  constructor(private http: HttpClient) { }

  getModulos(): Observable<Modulo[]> {
    return this.http.get<Modulo[]>(this.apiUrl, this.getHeaders());
  }

  createModulo(modulo: Modulo): Observable<Modulo> {
    return this.http.post<Modulo>(this.apiUrl, modulo, this.getHeaders());
  }

  updateModulo(id: number, modulo: Modulo): Observable<Modulo> {
    return this.http.put<Modulo>(`${this.apiUrl}/${id}`, modulo, this.getHeaders());
  }

  deleteModulo(id: number): Observable<void> {
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
