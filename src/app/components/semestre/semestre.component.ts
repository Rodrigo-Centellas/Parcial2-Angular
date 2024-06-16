import { Component, OnInit } from "@angular/core";
import { Semestre } from '../../models/semestre';
import { SemestreService } from "app/services/semestre.service";
import { MatDialog } from "@angular/material/dialog";
import { SemestreDialogComponent } from "../semestre-dialog/semestre-dialog.component";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";


@Component({
    selector: 'app-semestre',
    templateUrl: './semestre.component.html',
    styleUrls: ['./semestre.component.css']
})
export class SemestreComponent implements OnInit {

    semestres: Semestre[] = [];

    constructor(private semestreService: SemestreService, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.loadSemestres();
    }

    loadSemestres(): void {
        this.semestreService.getSemestres().subscribe(
            data => {
                this.semestres = data;
            },
            error => {
                console.error('Error al cargar los semestres:', error);
            }
        );
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(SemestreDialogComponent, {
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadSemestres(); // Recargar la lista después de crear uno nuevo
            }
        });
    }

    openEditDialog(semestre: Semestre): void {
        const dialogRef = this.dialog.open(SemestreDialogComponent, {
            width: '400px',
            data: { semestre } // Pasa el grupo al diálogo
        });

        dialogRef.afterClosed().subscribe(result => {
            this.loadSemestres();
        });
    }

    editSemestre(id: number): void {
        // Obtener el usuario por su ID
        const semestre = this.semestres.find(u => u.id === id);
        if (semestre) {
            this.openEditDialog(semestre); // Pasar el usuario al diálogo de edición
        }
    }

    updateSemestre(id: number, semestreData: any): void {
        this.semestreService.updateSemestre(id, semestreData).subscribe(
            () => {
                console.log('Semestre actualizado correctamente.');
                this.loadSemestres(); // Recargar la lista de aulas después de editar uno
            },
            error => {
                console.error('Error al actualizar el Semestre:', error);
            }
        );
    }

    confirmDelete(id: number): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.semestreService.deleteSemestre(id).subscribe(
                    () => {
                        this.loadSemestres(); // Recargar la lista de usuarios después de borrar uno
                    },
                    error => {
                        console.error('Error al borrar el semestre:', error);
                    }
                );
            }
        });
    }

}