import { Component, OnInit } from "@angular/core";
import { AsistenciaService } from "app/services/asistencia.service";
import { Asistencia } from "app/models/asistencia";

@Component({
    selector: 'app-asistencia',
    templateUrl: './asistencia.component.html',
    styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {
    asistencias: Asistencia[] = [];

    constructor(private asistenciaService: AsistenciaService) { }

    ngOnInit(): void {
        this.loadAsistencias();
    }

    loadAsistencias(): void {
        this.asistenciaService.getAsistencias().subscribe(
            data => {
                this.asistencias = data;
            },
            error => {
                console.error('Error al cargar las asistencias:', error);
            }
        );
    }

    updateAsistencia(id: number, asistenciaData: Asistencia): void {
        this.asistenciaService.updateAsistencia(id, asistenciaData).subscribe(
            () => {
                console.log('Asistencia actualizada correctamente.');
                this.loadAsistencias(); 
            },
            error => {
                console.error('Error al actualizar la asistencia:', error);
            }
        );
    }
}
