import { Component, OnInit } from '@angular/core';
import { HorarioClaseService } from '../../services/horario-clase.service';
import { ClaseService } from '../../services/clase.service';
import { HorarioService } from '../../services/horario.service';
import { Clase } from '../../models/clase';
import { HorarioClase } from '../../models/horario_clase';
import { Horario } from '../../models/horario';

@Component({
  selector: 'app-horario-clase',
  templateUrl: './horario-clase.component.html',
  styleUrls: ['./horario-clase.component.css']
})
export class HorarioClaseComponent implements OnInit {
  horarioClases: HorarioClase[] = [];
  clases: Clase[] = [];
  horarios: Horario[] = [];
  selectedHorarioClase: HorarioClase | null = null;
  errorMessage: string | null = null;

  constructor(
    private horarioClaseService: HorarioClaseService,
    private claseService: ClaseService,
    private horarioService: HorarioService
  ) {}

  ngOnInit(): void {
    this.getHorarioClases();
    this.getClases();
    this.getHorarios();
  }

  getHorarioClases(): void {
    this.horarioClaseService.getHorarioClases().subscribe(horarioClases => this.horarioClases = horarioClases);
  }

  getClases(): void {
    this.claseService.getClases().subscribe(clases => this.clases = clases);
  }

  getHorarios(): void {
    this.horarioService.getHorarios().subscribe(horarios => this.horarios = horarios);
  }

  save(horarioClaseForm: any): void {
    if (horarioClaseForm.valid && this.selectedHorarioClase) {
      this.horarioClaseService.createHorarioClase(this.selectedHorarioClase).subscribe({
        next: () => {
          this.getHorarioClases();
          this.selectedHorarioClase = null;
          this.errorMessage = null;
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Error al guardar el horario de la clase';
        }
      });
    }
  }

  selectHorarioClase(horarioClase: HorarioClase): void {
    this.selectedHorarioClase = { ...horarioClase };
  }

  delete(horarioClase: HorarioClase): void {
    this.horarioClaseService.deleteHorarioClase(horarioClase.id).subscribe(() => this.getHorarioClases());
  }

  addNew(): void {
    this.selectedHorarioClase = {
      id: 0,
      horario: { id: 0, horarioInicio: '', horarioFin: '', dia: '' },
      clase: { id: 0, cupo: 0, user: null, grupo: null, materia: null, aulas: [], horarios: [] }
    };
  }

  cancel(): void {
    this.selectedHorarioClase = null;
    this.errorMessage = null;
  }
}


