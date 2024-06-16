import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Grupo } from "app/models/grupo";
import { GrupoService } from "app/services/grupo.service";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { GrupoDialogComponent } from "../grupo-dialog/grupo-dialog.component";



@Component({
    selector: 'app-grupo',
    templateUrl: './grupo.component.html',
    styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

    grupos: any[];

    constructor(private grupoService: GrupoService, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.loadGrupos();
    }

    loadGrupos(): void {
        this.grupoService.getGrupos().subscribe(
            data => {
                this.grupos = data;
            },
            error => {
                console.error('Error al cargar los grupos:', error);
            }
        );
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(GrupoDialogComponent, {
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadGrupos(); // Recargar la lista de grupos después de crear uno nuevo
            }
        });
    }

    openEditDialog(grupo: Grupo): void {
        const dialogRef = this.dialog.open(GrupoDialogComponent, {
            width: '400px',
            data: { grupo } // Pasa el grupo al diálogo
        });

        dialogRef.afterClosed().subscribe(result => {
            this.loadGrupos();
        });
    }

    editGrupo(id: number): void {
        // Obtener el usuario por su ID
        const grupo = this.grupos.find(u => u.id === id);
        if (grupo) {
            this.openEditDialog(grupo); // Pasar el usuario al diálogo de edición
        }
    }

    updateGrupo(id: number, grupoData: any): void {
        this.grupoService.updateGrupo(id, grupoData).subscribe(
            () => {
                console.log('Grupo actualizado correctamente.');
                this.loadGrupos(); // Recargar la lista de aulas después de editar uno
            },
            error => {
                console.error('Error al actualizar el grupo:', error);
            }
        );
    }

    confirmDelete(id: number): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.grupoService.deleteGrupo(id).subscribe(
                    () => {
                        this.loadGrupos(); // Recargar la lista de usuarios después de borrar uno
                    },
                    error => {
                        console.error('Error al borrar el aula:', error);
                    }
                );
            }
        });
    }

}