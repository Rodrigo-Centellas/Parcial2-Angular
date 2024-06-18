import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_AUTH } from 'app/utilities/config';

@Injectable({
  providedIn: 'root'
})
export class ReportService {


  private apiUrl = `${API_AUTH}/reporte`;
  constructor(private http: HttpClient) { }

  exportPdf(): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}/export-pdf`, { headers, responseType: 'blob' });
  }

  exportXls(): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.apiUrl}/export-xls`, { headers, responseType: 'blob' });
  }
}
