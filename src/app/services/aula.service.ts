// src/app/services/aula.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aula } from '../models/aula';
import { API_URL_API } from '../utilities/config';

@Injectable({
  providedIn: 'root'
})
export class AulaService {
  private apiUrl = `${API_URL_API}/aulas`;

  constructor(private http: HttpClient) {}

  getAulas(): Observable<Aula[]> {
    return this.http.get<Aula[]>(this.apiUrl, this.getHeaders());
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
