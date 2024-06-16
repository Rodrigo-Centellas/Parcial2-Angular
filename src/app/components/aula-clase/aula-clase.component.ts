import { Component, OnInit } from '@angular/core';
import { AulaClaseService } from '../../services/aula-clase.service';
import { ClaseService } from '../../services/clase.service';
import { AulaService } from '../../services/aula.service';
import { AulaClase } from '../../models/aula_clase';
import { Clase } from '../../models/clase';
import { Aula } from '../../models/aula';

@Component({
  selector: 'app-aula-clase',
  templateUrl: './aula-clase.component.html',
  styleUrls: ['./aula-clase.component.css']
})
export class AulaClaseComponent implements OnInit {
  aulaClases: AulaClase[] = [];
  clases: Clase[] = [];
  aulas: Aula[] = [];
  selectedAulaClase: AulaClase | null = null;
  errorMessage: string | null = null;

  constructor(
    private aulaClaseService: AulaClaseService,
    private claseService: ClaseService,
    private aulaService: AulaService
  ) {}

  ngOnInit(): void {
    this.getAulaClases();
    this.getClases();
    this.getAulas();
  }

  getAulaClases(): void {
    this.aulaClaseService.getAulaClases().subscribe(aulaClases => this.aulaClases = aulaClases);
  }

  getClases(): void {
    this.claseService.getClases().subscribe(clases => this.clases = clases);
  }

  getAulas(): void {
    this.aulaService.getAulas().subscribe(aulas => this.aulas = aulas);
  }

  selectAulaClase(aulaClase: AulaClase): void {
    this.selectedAulaClase = { ...aulaClase };
  }

  save(aulaClaseForm: any): void {
    if (aulaClaseForm.valid && this.selectedAulaClase) {
      this.aulaClaseService.createAulaClase(this.selectedAulaClase).subscribe({
        next: () => {
          this.getAulaClases();
          this.selectedAulaClase = null;
          this.errorMessage = null;
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Error al guardar el aula de la clase';
        }
      });
    }
  }

  delete(aulaClase: AulaClase): void {
    this.aulaClaseService.deleteAulaClase(aulaClase.id).subscribe(() => this.getAulaClases());
  }

  addNew(): void {
    this.selectedAulaClase = {
    id: 0,
    aula: { id: 0, nombre: '' },
    clase: { id: 0, cupo: 0, user: null, grupo: null, materia: null, aulas: [], horarios: [] }
    };
    }

  cancel(): void {
    this.selectedAulaClase = null;
    this.errorMessage = null;
  }
}
