import { Component, OnInit } from '@angular/core';
import { CarreraService } from '../../services/carrera.service';
import { FacultadService } from '../../services/facultad.service';
import { Carrera } from '../../models/carrera';
import { Facultad } from '../../models/facultad';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent implements OnInit {
  carreras: Carrera[] = [];
  facultades: Facultad[] = [];
  selectedCarrera: Carrera | null = null;

  constructor(
    private carreraService: CarreraService,
    private facultadService: FacultadService
  ) {}

  ngOnInit(): void {
    this.getCarreras();
    this.getFacultades();
  }

  getCarreras(): void {
    this.carreraService.getCarreras().subscribe(carreras => this.carreras = carreras);
  }

  getFacultades(): void {
    this.facultadService.getFacultades().subscribe(facultades => this.facultades = facultades);
  }

  selectCarrera(carrera: Carrera): void {
    this.selectedCarrera = { ...carrera };
  }

  save(carreraForm: any): void {
    if (carreraForm.valid && this.selectedCarrera) {
      if (this.selectedCarrera.id) {
        this.carreraService.updateCarrera(this.selectedCarrera.id, this.selectedCarrera)
          .subscribe(() => {
            this.getCarreras();
            this.selectedCarrera = null;
          });
      } else {
        this.carreraService.createCarrera(this.selectedCarrera)
          .subscribe(() => {
            this.getCarreras();
            this.selectedCarrera = null;
          });
      }
    }
  }

  delete(carrera: Carrera): void {
    this.carreraService.deleteCarrera(carrera.id).subscribe(() => this.getCarreras());
  }

  addNew(): void {
    this.selectedCarrera = { id: 0, nombre: '', codigo: '', facultad: { id: 0, nombre: '' } };
  }

  cancel(): void {
    this.selectedCarrera = null;
  }
}
