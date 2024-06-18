import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_AUTH } from "app/utilities/config";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ReporteAsistenciaService {


  private apiUrl = `${API_AUTH}/reporteasistencia`;
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
