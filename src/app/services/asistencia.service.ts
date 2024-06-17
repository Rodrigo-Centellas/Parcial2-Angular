import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Asistencia } from "app/models/asistencia";
import { API_URL } from "app/utilities/config";

@Injectable({
    providedIn: 'root'
})
export class AsistenciaService {
    constructor(private http: HttpClient, private authService: AuthService) { }

    getAsistencias(): Observable<Asistencia[]> {
        return this.http.get<Asistencia[]>(`${API_URL}/asistencias`, this.authService.getHeaders());
    }

    createAsistencia(asistencia: Asistencia): Observable<Asistencia> {
        return this.http.post<Asistencia>(`${API_URL}/asistencias`, asistencia, this.authService.getHeaders());
    }

    updateAsistencia(id: number, asistenciaData: Asistencia): Observable<Asistencia> {
        return this.http.put<Asistencia>(`${API_URL}/asistencias/${id}`, asistenciaData, this.authService.getHeaders());
    }


    deleteAsistencia(id: number): Observable<Asistencia> {
        const url = `${API_URL}/asistencias/${id}`;
        return this.http.delete<Asistencia>(url, this.authService.getHeaders());
    }
}