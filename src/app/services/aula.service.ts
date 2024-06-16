// // src/app/services/aula.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Aula } from '../models/aula';
// import { API_URL_API } from '../utilities/config';

// @Injectable({
//   providedIn: 'root'
// })
// export class AulaService {
//   private apiUrl = `${API_URL_API}/aulas`;

//   constructor(private http: HttpClient) {}

//   getAulas(): Observable<Aula[]> {
//     return this.http.get<Aula[]>(this.apiUrl, this.getHeaders());
//   }

//   private getHeaders() {
//     const token = localStorage.getItem('jwtToken');
//     return {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       })
//     };
//   }
// }


import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Aula } from "app/models/aula";
import { API_URL } from "app/utilities/config";

@Injectable({
    providedIn: 'root'
  })
  export class AulaService{
    constructor(private http: HttpClient, private authService: AuthService) { }

    getAulas(): Observable<Aula[]> {
        return this.http.get<Aula[]>(`${API_URL}/aulas`, this.authService.getHeaders());
      }
    
      createAula(aula: Aula): Observable<Aula> {
        return this.http.post<Aula>(`${API_URL}/aulas`, aula, this.authService.getHeaders());
      }
    
      updateAula(id: number, aulaData: Aula): Observable<Aula> {
        return this.http.put<Aula>(`${API_URL}/aulas/${id}`, aulaData, this.authService.getHeaders());
    }
    
    
      deleteAula(id: number): Observable<Aula> {
        const url = `${API_URL}/aulas/${id}`;
        return this.http.delete<Aula>(url, this.authService.getHeaders());
      }
  }