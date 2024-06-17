import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { HorarioService } from "app/services/horario.service";
import { HorarioDialogComponent } from "../horario-dialog/horario-dialog.component";
import { Horario } from "app/models/horario";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";

@Component({
    selector: 'app-horario',
    templateUrl: './horario.component.html',
    styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

    horarios: any[];

    constructor(private horarioService: HorarioService, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.loadHorarios();
    }

    loadHorarios(): void {
        this.horarioService.getHorarios().subscribe(
            data => {
                this.horarios = data;
            },
            error => {
                console.error('Error al cargar las horarios:', error);
            }
        );
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(HorarioDialogComponent, {
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadHorarios(); // Recargar la lista de usuarios después de crear uno nuevo
            }
        });
    }

    openEditDialog(horario: Horario): void {
        const dialogRef = this.dialog.open(HorarioDialogComponent, {
            width: '400px',
            data: { horario } // Pasa el usuario al diálogo
        });

        dialogRef.afterClosed().subscribe(result => {
            this.loadHorarios();
        });
    }

    editHorario(id: number): void {
        // Obtener el usuario por su ID
        const horario = this.horarios.find(u => u.id === id);
        if (horario) {
            this.openEditDialog(horario); // Pasar el usuario al diálogo de edición
        }
    }

    updateHorario(id: number, horarioData: any): void {
        this.horarioService.updateHorarios(id, horarioData).subscribe(
            () => {
                console.log('horario actualizada correctamente.');
                this.loadHorarios(); // Recargar la lista de horarios después de editar uno
            },
            error => {
                console.error('Error al actualizar el horario:', error);
            }
        );
    }

    confirmDelete(id: number): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.horarioService.deleteHorarios(id).subscribe(
                    () => {
                        this.loadHorarios(); // Recargar la lista de usuarios después de borrar uno
                    },
                    error => {
                        console.error('Error al borrar el horario:', error);
                    }
                );
            }
        });
    }

}