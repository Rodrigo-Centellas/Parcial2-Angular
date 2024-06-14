import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../../services/materia.service';
import { Materia } from '../../models/materia';
import { FacultadService } from '../../services/facultad.service';
import { Facultad } from '../../models/facultad';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {
  materias: Materia[] = [];
  facultades: Facultad[] = [];
  selectedMateria: Materia | null = null;

  constructor(
    private materiaService: MateriaService,
    private facultadService: FacultadService
  ) {}

  ngOnInit(): void {
    this.getMaterias();
    this.getFacultades();
  }

  getMaterias(): void {
    this.materiaService.getMaterias().subscribe(materias => this.materias = materias);
  }

  getFacultades(): void {
    this.facultadService.getFacultades().subscribe(facultades => this.facultades = facultades);
  }

  selectMateria(materia: Materia): void {
    this.selectedMateria = { ...materia };
  }

  save(): void {
    if (this.selectedMateria) {
      if (this.selectedMateria.id) {
        this.materiaService.updateMateria(this.selectedMateria.id, this.selectedMateria)
          .subscribe(() => {
            this.getMaterias();
            this.selectedMateria = null;
          });
      } else {
        this.materiaService.createMateria(this.selectedMateria)
          .subscribe(() => {
            this.getMaterias();
            this.selectedMateria = null;
          });
      }
    }
  }

  delete(materia: Materia): void {
    this.materiaService.deleteMateria(materia.id).subscribe(() => this.getMaterias());
  }

  addNew(): void {
    this.selectedMateria = { id: 0, nombre: '', sigla: '', horas: 0, nivel: 0 };
  }

  cancel(): void {
    this.selectedMateria = null;
  }
}
