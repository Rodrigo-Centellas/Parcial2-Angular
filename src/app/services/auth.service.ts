// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'app/utilities/config';

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  jtw: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // Adjust the URL if needed
  private apiUrl = `${API_URL}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signing`, credentials);
  }

  signup(user: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, user);
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  getHeaders() {
    const token = localStorage.getItem('jwtToken');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }
}
