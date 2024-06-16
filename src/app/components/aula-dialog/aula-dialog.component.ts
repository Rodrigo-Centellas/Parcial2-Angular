import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Aula } from "app/models/aula";
import { Modulo } from "app/models/modulo";
import { AulaService } from "app/services/aula.service";
import { ModuloService } from "app/services/modulo.service";

@Component({
  selector: 'app-aula-dialog',
  templateUrl: './aula-dialog.component.html',
  styleUrls: ['./aula-dialog.component.css']
})
export class AulaDialogComponent implements OnInit {

  aulaForm: FormGroup;
  modulos: Modulo[] = [];

  constructor(
    private fb: FormBuilder,
    private aulaService: AulaService,
    private moduloService: ModuloService,
    public dialogRef: MatDialogRef<AulaDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { aula: Aula }
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadModulos();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private loadModulos(): void {
    this.moduloService.getModulos().subscribe(
      (data: Modulo[]) => {
        this.modulos = data;
      },
      error => {
        console.error('Error al cargar los módulos:', error);
      }
    );
  }

  private initForm(): void {
    // Inicializar el formulario y establecer los valores predeterminados según el modo (crear o editar)
    this.aulaForm = this.formBuilder.group({
      nombre: [this.data?.aula?.nombre || '', Validators.required],
      capacidad: [this.data?.aula?.capacidad || '', Validators.required],
      modulo: [this.data?.aula?.modulo.id || '', Validators.required],
    });
  }

  onSave(): void {
    if (this.aulaForm.valid) {
      const aulaData = this.aulaForm.value;
      const aula: Aula = {
        id: this.data?.aula?.id,
        nombre: aulaData.nombre,
        capacidad: aulaData.capacidad,
        modulo: this.modulos.find(mod => mod.id === aulaData.modulo)
      };

      if (this.data && this.data.aula) {
        this.updateAula(aula);
      } else {
        this.createAula(aula);
      }
    }
  }

  private createAula(aulaData: Aula): void {
    this.aulaService.createAula(aulaData).subscribe(
      response => {
        this.dialogRef.close(response); // Cerrar el diálogo y devolver la respuesta
      },
      error => {
        console.error('Error al crear el aula:', error);
      }
    );
  }

  private updateAula(aulaData: Aula): void {
    const aulaId = this.data.aula.id;
    this.aulaService.updateAula(aulaId, aulaData).subscribe(
      () => {
        console.log('Aula actualizada correctamente.');
        this.dialogRef.close();
      },
      error => {
        console.error('Error al actualizar el aula:', error);
      }
    );
  }
}