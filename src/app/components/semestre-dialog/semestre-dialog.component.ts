import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Semestre } from "app/models/semestre";
import { SemestreService } from "app/services/semestre.service";

@Component({
  selector: 'app-semestre-dialog',
  templateUrl: './semestre-dialog.component.html',
  styleUrls: ['./semestre-dialog.component.css']
})
export class SemestreDialogComponent implements OnInit {

  semestreForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private semestreService: SemestreService,
    public dialogRef: MatDialogRef<SemestreDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { semestre: Semestre }
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private initForm(): void {
    // Inicializar el formulario y establecer los valores predeterminados según el modo (crear o editar)
    this.semestreForm = this.formBuilder.group({
      semestre: [this.data?.semestre?.semestre || '', Validators.required],   
      gestion: [this.data?.semestre?.gestion || '', Validators.required],   
    });
  }
  onSave(): void {
    if (this.semestreForm.valid) {
      const semestreData = this.semestreForm.value;
      if (this.data && this.data.semestre) {
        this.updateSemestre(semestreData);
      } else {
        this.createSemestre(semestreData);
      }
    }
  }

  private createSemestre(semestreData: Semestre): void {
    this.semestreService.createSemestre(semestreData).subscribe(
      response => {
        this.dialogRef.close(response); // Cerrar el diálogo y devolver la respuesta
      },
      error => {
        console.error('Error al crear el semestre:', error);
      }
    );
  }

  private updateSemestre(semestreData: Semestre): void {
    const semestreId = this.data.semestre.id;
    this.semestreService.updateSemestre(semestreId, semestreData).subscribe(
      () => {
        console.log('Semestre actualizado correctamente.');
        this.dialogRef.close();
      },
      error => {
        console.error('Error al actualizar el Semestre:', error);
      }
    );
  }
}
