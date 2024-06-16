// src/app/services/licencia.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Licencia } from '../models/licencia';
import { API_URL_API } from 'app/utilities/config';

@Injectable({
  providedIn: 'root'
})
export class LicenciaService {
  private apiUrl = `${API_URL_API}/licencias`;

  constructor(private http: HttpClient) {}

  getLicencias(): Observable<Licencia[]> {
    return this.http.get<Licencia[]>(this.apiUrl, this.getHeaders());
  }

  getLicenciaById(id: number): Observable<Licencia> {
    return this.http.get<Licencia>(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  updateLicencia(id: number, licencia: Licencia): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, licencia, this.getHeaders());
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

  approveLicencia(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/aprobar`, null);
  }

  rejectLicencia(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/rechazar`, null);
  }
}
