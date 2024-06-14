// src/app/services/facultad.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facultad } from '../models/facultad';
import { API_URL_API } from '../utilities/config';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {
  private apiUrl = `${API_URL_API}/facultades`;

  constructor(private http: HttpClient) { }

  getFacultades(): Observable<Facultad[]> {
    return this.http.get<Facultad[]>(this.apiUrl, this.getHeaders());
  }

  createFacultad(facultad: Facultad): Observable<Facultad> {
    return this.http.post<Facultad>(this.apiUrl, facultad, this.getHeaders());
  }

  updateFacultad(id: number, facultad: Facultad): Observable<Facultad> {
    return this.http.put<Facultad>(`${this.apiUrl}/${id}`, facultad, this.getHeaders());
  }

  deleteFacultad(id: number): Observable<void> {
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
