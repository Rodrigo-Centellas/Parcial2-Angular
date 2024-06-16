import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { GrupoService } from "app/services/grupo.service";
import { Grupo } from '../../models/grupo';



@Component({
  selector: 'app-grupo-dialog',
  templateUrl: './grupo-dialog.component.html',
  styleUrls: ['./grupo-dialog.component.css']
})
export class GrupoDialogComponent implements OnInit {

  grupoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private grupoService: GrupoService,
    public dialogRef: MatDialogRef<GrupoDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { grupo: Grupo }
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private initForm(): void {
    // Inicializar el formulario y establecer los valores predeterminados según el modo (crear o editar)
    this.grupoForm = this.formBuilder.group({
      nombre: [this.data?.grupo?.nombre || '', Validators.required],      
    });
  }
  onSave(): void {
    if (this.grupoForm.valid) {
      const grupoData = this.grupoForm.value;
      if (this.data && this.data.grupo) {
        this.updateGrupo(grupoData);
      } else {
        this.createGrupo(grupoData);
      }
    }
  }

  private createGrupo(grupoData: Grupo): void {
    this.grupoService.createGrupo(grupoData).subscribe(
      response => {
        this.dialogRef.close(response); // Cerrar el diálogo y devolver la respuesta
      },
      error => {
        console.error('Error al crear el grupo:', error);
      }
    );
  }

  private updateGrupo(grupoData: Grupo): void {
    const grupoId = this.data.grupo.id;
    this.grupoService.updateGrupo(grupoId, grupoData).subscribe(
      () => {
        console.log('Grupo actualizado correctamente.');
        this.dialogRef.close();
      },
      error => {
        console.error('Error al actualizar el grupo:', error);
      }
    );
  }
}
