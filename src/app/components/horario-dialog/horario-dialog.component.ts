import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Aula } from "app/models/aula";
import { Horario } from "app/models/horario";
import { AulaService } from "app/services/aula.service";
import { HorarioService } from "app/services/horario.service";

@Component({
  selector: 'app-horario-dialog',
  templateUrl: './horario-dialog.component.html',
  styleUrls: ['./horario-dialog.component.css']
})
export class HorarioDialogComponent implements OnInit {

  horarioForm: FormGroup;
  aulas: Aula[] = [];

  constructor(
    private fb: FormBuilder,
    private aulaService: AulaService,
    private horarioService: HorarioService,
    public dialogRef: MatDialogRef<HorarioDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { horario: Horario }
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadAulas();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private loadAulas(): void {
    this.aulaService.getAulas().subscribe(
      (data: Aula[]) => {
        this.aulas = data;
      },
      error => {
        console.error('Error al cargar las aulas:', error);
      }
    );
  }

  private initForm(): void {
    // Inicializar el formulario y establecer los valores predeterminados según el modo (crear o editar)
    this.horarioForm = this.formBuilder.group({
      horarioInicio: [this.data?.horario?.horarioInicio || '', Validators.required],
      horarioFin: [this.data?.horario?.horarioFin || '', Validators.required],
      dia: [this.data?.horario?.dia || '', Validators.required],
      aula: [this.data?.horario?.aula.id || '', Validators.required],
    });
  }

  onSave(): void {
    if (this.horarioForm.valid) {
      const horarioData = this.horarioForm.value;
      const horario: Horario = {
        id: this.data?.horario?.id,
        horarioInicio: horarioData.horarioInicio,
        horarioFin: horarioData.horarioFin,
        dia: horarioData.dia,
        aula: this.aulas.find(aul => aul.id === horarioData.aula)
      };

      if (this.data && this.data.horario) {
        this.updateHorario(horario);
      } else {
        this.createHorario(horario);
      }
    }
  }

  private createHorario(horarioData: Horario): void {
    this.horarioService.createHorarios(horarioData).subscribe(
      response => {
        this.dialogRef.close(response); // Cerrar el diálogo y devolver la respuesta
      },
      error => {
        console.error('Error al crear el horario:', error);
      }
    );
  }

  private updateHorario(horarioData: Horario): void {
    const horarioId = this.data.horario.id;
    this.horarioService.updateHorarios(horarioId, horarioData).subscribe(
      () => {
        console.log('Horario actualizada correctamente.');
        this.dialogRef.close();
      },
      error => {
        console.error('Error al actualizar el Horario:', error);
      }
    );
  }
}