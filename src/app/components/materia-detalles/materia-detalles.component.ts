import { Component, OnInit } from '@angular/core';
import { MateriaDetallesService } from '../../services/materia-detalles.service';
import { MateriaDetalles } from '../../models/materia-detalles';
import { CarreraService } from '../../services/carrera.service';
import { MateriaService } from '../../services/materia.service';
import { Carrera } from '../../models/carrera';
import { Materia } from '../../models/materia';

@Component({
  selector: 'app-materia-detalles',
  templateUrl: './materia-detalles.component.html',
  styleUrls: ['./materia-detalles.component.css']
})
export class MateriaDetallesComponent implements OnInit {
  materiaDetalles: MateriaDetalles[] = [];
  carreras: Carrera[] = [];
  materias: Materia[] = [];
  selectedMateriaDetalles: MateriaDetalles | null = null;

  constructor(
    private materiaDetallesService: MateriaDetallesService,
    private carreraService: CarreraService,
    private materiaService: MateriaService
  ) {}

  ngOnInit(): void {
    this.getMateriaDetalles();
    this.getCarreras();
    this.getMaterias();
  }

  getMateriaDetalles(): void {
    this.materiaDetallesService.getMateriaDetalles().subscribe(materiaDetalles => this.materiaDetalles = materiaDetalles);
  }

  getCarreras(): void {
    this.carreraService.getCarreras().subscribe(carreras => this.carreras = carreras);
  }

  getMaterias(): void {
    this.materiaService.getMaterias().subscribe(materias => this.materias = materias);
  }

  selectMateriaDetalles(materiaDetalles: MateriaDetalles): void {
    this.selectedMateriaDetalles = { ...materiaDetalles };
  }

  save(): void {
    if (this.selectedMateriaDetalles) {
      if (this.selectedMateriaDetalles.id) {
        this.materiaDetallesService.updateMateriaDetalles(this.selectedMateriaDetalles.id, this.selectedMateriaDetalles)
          .subscribe(() => {
            this.getMateriaDetalles();
            this.selectedMateriaDetalles = null;
          });
      } else {
        this.materiaDetallesService.createMateriaDetalles(this.selectedMateriaDetalles)
          .subscribe(() => {
            this.getMateriaDetalles();
            this.selectedMateriaDetalles = null;
          });
      }
    }
  }

  delete(materiaDetalles: MateriaDetalles): void {
    this.materiaDetallesService.deleteMateriaDetalles(materiaDetalles.id).subscribe(() => this.getMateriaDetalles());
  }

  addNew(): void {
    this.selectedMateriaDetalles = { id: 0, carrera: { id: 0, nombre: '' }, materia: { id: 0, nombre: '' } };
  }

  cancel(): void {
    this.selectedMateriaDetalles = null;
  }
}
