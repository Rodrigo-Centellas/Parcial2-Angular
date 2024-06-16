import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Grupo } from "app/models/grupo";
import { API_URL } from "app/utilities/config";

@Injectable({
    providedIn: 'root'
})
export class GrupoService {
    constructor(private http: HttpClient, private authService: AuthService) { }

    getGrupos(): Observable<Grupo[]> {
        return this.http.get<Grupo[]>(`${API_URL}/grupos`, this.authService.getHeaders());
    }

    createGrupo(grupo: Grupo): Observable<Grupo> {
        return this.http.post<Grupo>(`${API_URL}/grupos`, grupo, this.authService.getHeaders());
    }

    updateGrupo(id: number, grupoData: Grupo): Observable<Grupo> {
        return this.http.put<Grupo>(`${API_URL}/grupos/${id}`, grupoData, this.authService.getHeaders());
    }


    deleteGrupo(id: number): Observable<Grupo> {
        const url = `${API_URL}/grupos/${id}`;
        return this.http.delete<Grupo>(url, this.authService.getHeaders());
    }
}