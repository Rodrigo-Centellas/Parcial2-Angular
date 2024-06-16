// src/app/components/asignar-clase/asignar-clase.component.ts
import { Component, OnInit } from '@angular/core';
import { ClaseService } from '../../services/clase.service';
import { HorarioService } from '../../services/horario.service';
import { AulaService } from '../../services/aula.service';
import { Clase } from '../../models/clase';
import { Horario } from '../../models/horario';
import { Aula } from '../../models/aula';

@Component({
  selector: 'app-asignar-clase',
  templateUrl: './asignar-clase.component.html',
  styleUrls: ['./asignar-clase.component.css']
})
export class AsignarClaseComponent implements OnInit {
  clases: Clase[] = [];
  horarios: Horario[] = [];
  aulas: Aula[] = [];
  selectedClase: Clase | null = null;
  selectedHorarios: Horario[] = [];
  selectedAulas: Aula[] = [];
  message: string = '';

  constructor(
    private claseService: ClaseService,
    private horarioService: HorarioService,
    private aulaService: AulaService
  ) {}

  ngOnInit(): void {
    this.getClases();
    this.getHorarios();
    this.getAulas();
  }

  getClases(): void {
    this.claseService.getClases().subscribe(clases => this.clases = clases);
  }

  getHorarios(): void {
    this.horarioService.getHorarios().subscribe(horarios => this.horarios = horarios);
  }

  getAulas(): void {
    this.aulaService.getAulas().subscribe(aulas => this.aulas = aulas);
  }

  selectClase(clase: Clase): void {
    this.selectedClase = { ...clase };
  }

  save(): void {
    if (this.selectedClase) {
      // Aquí debes agregar la lógica para guardar la relación de horarios y aulas con la clase.
      console.log('Clase:', this.selectedClase);
      console.log('Horarios:', this.selectedHorarios);
      console.log('Aulas:', this.selectedAulas);
      // Simulación de guardado
      this.message = 'Clase guardada con éxito';
      setTimeout(() => {
        this.message = '';
      }, 3000);
    } else {
      this.message = 'Error al guardar la clase';
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }
  }

  cancel(): void {
    this.selectedClase = null;
    this.selectedHorarios = [];
    this.selectedAulas = [];
  }
}
