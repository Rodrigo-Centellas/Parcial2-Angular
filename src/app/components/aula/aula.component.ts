import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Aula } from "app/models/aula";
import { AulaService } from "app/services/aula.service";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { AulaDialogComponent } from "../aula-dialog/aula-dialog.component";


@Component({
    selector: 'app-aula',
    templateUrl: './aula.component.html',
    styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {

    aulas: any[];

    constructor(private aulaService: AulaService, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.loadAulas();
    }

    loadAulas(): void {
        this.aulaService.getAulas().subscribe(
            data => {
                this.aulas = data;
            },
            error => {
                console.error('Error al cargar las aulas:', error);
            }
        );
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AulaDialogComponent, {
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadAulas(); // Recargar la lista de usuarios después de crear uno nuevo
            }
        });
    }

    openEditDialog(aula: Aula): void {
        const dialogRef = this.dialog.open(AulaDialogComponent, {
            width: '400px',
            data: { aula } // Pasa el usuario al diálogo
        });

        dialogRef.afterClosed().subscribe(result => {
            this.loadAulas();
        });
    }

    editAula(id: number): void {
        // Obtener el usuario por su ID
        const aula = this.aulas.find(u => u.id === id);
        if (aula) {
            this.openEditDialog(aula); // Pasar el usuario al diálogo de edición
        }
    }

    updateAula(id: number, aulaData: any): void {
        this.aulaService.updateAula(id, aulaData).subscribe(
            () => {
                console.log('Aula actualizada correctamente.');
                this.loadAulas(); // Recargar la lista de aulas después de editar uno
            },
            error => {
                console.error('Error al actualizar el aula:', error);
            }
        );
    }

    confirmDelete(id: number): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.aulaService.deleteAula(id).subscribe(
                    () => {
                        this.loadAulas(); // Recargar la lista de usuarios después de borrar uno
                    },
                    error => {
                        console.error('Error al borrar el aula:', error);
                    }
                );
            }
        });
    }

}