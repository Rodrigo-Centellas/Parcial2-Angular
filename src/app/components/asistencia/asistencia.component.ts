import { Component, OnInit } from "@angular/core";
import { AsistenciaService } from "app/services/asistencia.service";
import { Asistencia } from "app/models/asistencia";
import { MatDialog } from "@angular/material/dialog";
import { AsistenciaDialogComponent } from "../asistencia-dialog/asistencia-dialog.component";

@Component({
    selector: 'app-asistencia',
    templateUrl: './asistencia.component.html',
    styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {
    asistencias: Asistencia[] = [];

    constructor(private asistenciaService: AsistenciaService, public dialog: MatDialog) { }

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

    
    openDialog(): void {
        const dialogRef = this.dialog.open(AsistenciaDialogComponent, {
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadAsistencias(); 
            }
        });
    }

    openEditDialog(asistencia: Asistencia): void {
        const dialogRef = this.dialog.open(AsistenciaDialogComponent, {
            width: '400px',
            data: { asistencia } // Pasa el usuario al diálogo
        });

        dialogRef.afterClosed().subscribe(result => {
            this.loadAsistencias();
        });
    }

    editAula(id: number): void {
        // Obtener el usuario por su ID
        const asistencia = this.asistencias.find(u => u.id === id);
        if (asistencia) {
            this.openEditDialog(asistencia); // Pasar el usuario al diálogo de edición
        }
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
