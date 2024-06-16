import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clase } from '../models/clase';
import { API_URL_API } from '../utilities/config';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {
  private apiUrl = `${API_URL_API}/clases`;

  constructor(private http: HttpClient) { }

  getClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.apiUrl, this.getHeaders());
  }

  createClase(clase: Clase): Observable<Clase> {
    return this.http.post<Clase>(this.apiUrl, clase, this.getHeaders());
  }

  updateClase(id: number, clase: Clase): Observable<Clase> {
    return this.http.put<Clase>(`${this.apiUrl}/${id}`, clase, this.getHeaders());
  }

  deleteClase(id: number): Observable<void> {
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
