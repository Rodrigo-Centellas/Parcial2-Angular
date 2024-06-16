import { Semestre } from './../models/semestre';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { API_URL } from "app/utilities/config";


@Injectable({
    providedIn: 'root'
})
export class SemestreService {
    constructor(private http: HttpClient, private authService: AuthService) { }

    getSemestres(): Observable<Semestre[]> {
        return this.http.get<Semestre[]>(`${API_URL}/semestres`, this.authService.getHeaders());
    }

    createSemestre(semestre: Semestre): Observable<Semestre> {
        return this.http.post<Semestre>(`${API_URL}/semestres`, semestre, this.authService.getHeaders());
    }

    updateSemestre(id: number, semestreData: Semestre): Observable<Semestre> {
        return this.http.put<Semestre>(`${API_URL}/semestres/${id}`, semestreData, this.authService.getHeaders());
    }


    deleteSemestre(id: number): Observable<Semestre> {
        const url = `${API_URL}/semestres/${id}`;
        return this.http.delete<Semestre>(url, this.authService.getHeaders());
    }
}