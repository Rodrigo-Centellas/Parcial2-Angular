import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Asistencia } from '../../models/asistencia';
import { AsistenciaService } from '../../services/asistencia.service';
import { User } from "app/models/usuario";
import { Clase } from "app/models/clase";
import { Horario } from "app/models/horario";
import { UserService } from "app/services/user.service";
import { ClaseService } from "app/services/clase.service";
import { HorarioService } from "app/services/horario.service";

@Component({
    selector: 'app-asistencia-dialog',
    templateUrl: './asistencia-dialog.component.html',
    styleUrls: ['./asistencia-dialog.component.css']
})
export class AsistenciaDialogComponent implements OnInit {

    asistenciaForm: FormGroup;
    users: User[] = [];
    clases: Clase[] = [];
    horarios: Horario[] = [];

    constructor(
        private fb: FormBuilder,
        private asistenciaService: AsistenciaService,
        private userService: UserService,
        private claseService: ClaseService,
        private horarioService: HorarioService,
        public dialogRef: MatDialogRef<AsistenciaDialogComponent>,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: { asistencia: Asistencia }
    ) { }

    ngOnInit(): void {
        this.initForm();
        this.loadUsers();
        this.loadClases();
        this.loadHorarios();
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    private loadUsers(): void {
        this.userService.getUsers().subscribe(
            (data: User[]) => {
                this.users = data;
            },
            error => {
                console.error('Error al cargar los usuarios:', error);
            }
        );
    }

    private loadClases(): void {
        this.claseService.getClases().subscribe(
            (data: Clase[]) => {
                this.clases = data;
            },
            error => {
                console.error('Error al cargar los clases:', error);
            }
        );
    }

    private loadHorarios(): void {
        this.horarioService.getHorarios().subscribe(
            (data: Horario[]) => {
                this.horarios = data;
            },
            error => {
                console.error('Error al cargar los horarios:', error);
            }
        );
    }

    private initForm(): void {
        // Inicializar el formulario y establecer los valores predeterminados según el modo (crear o editar)
        this.asistenciaForm = this.formBuilder.group({
            tipo: [this.data?.asistencia?.tipo || '', Validators.required],
            fecha: [this.data?.asistencia?.fecha || '', Validators.required],
            user: [this.data?.asistencia?.user.id || '', Validators.required],
            clase: [this.data?.asistencia?.clase.id || '', Validators.required],
            horario: [this.data?.asistencia?.horario.id || '', Validators.required],            
            hora_ingreso: [this.data?.asistencia?.hora_ingreso || ''],
            hora_salida: [this.data?.asistencia?.hora_salida || ''],
            minutos_atraso: [this.data?.asistencia?.minutos_atraso || ''],
        });
    }

    onSave(): void {
        if (this.asistenciaForm.valid) {
            const asistenciaData = this.asistenciaForm.value;
            const asistencia: Asistencia = {
                id: this.data?.asistencia?.id,
                tipo: asistenciaData.tipo,
                hora_ingreso: asistenciaData.hora_ingreso,
                hora_salida: asistenciaData.hora_salida,
                minutos_atraso: asistenciaData.minutos_atraso,
                fecha: asistenciaData.fecha,
                user: this.users.find(user => user.id === asistenciaData.user),
                clase: this.clases.find(clase => clase.id === asistenciaData.clase),
                horario: this.horarios.find(horario => horario.id === asistenciaData.horario)

            };

            if (this.data && this.data.asistencia) {
                this.updateAsistencia(asistencia);
            } else {
                this.createAsistencia(asistencia);
            }
        }
    }

    private createAsistencia(asistenciaData: Asistencia): void {
        this.asistenciaService.createAsistencia(asistenciaData).subscribe(
            response => {
                this.dialogRef.close(response); // Cerrar el diálogo y devolver la respuesta
            },
            error => {
                console.error('Error al crear el asistencia:', error);
            }
        );
    }

    private updateAsistencia(asistenciaData: Asistencia): void {
        const asistenciaId = this.data.asistencia.id;
        this.asistenciaService.updateAsistencia(asistenciaId, asistenciaData).subscribe(
            () => {
                console.log('asistencia actualizada correctamente.');
                this.dialogRef.close();
            },
            error => {
                console.error('Error al actualizar el asistencia:', error);
            }
        );
    }
}