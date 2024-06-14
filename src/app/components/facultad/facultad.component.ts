// src/app/components/facultad/facultad.component.ts
import { Component, OnInit } from '@angular/core';
import { FacultadService } from '../../services/facultad.service';
import { Facultad } from '../../models/facultad';

@Component({
  selector: 'app-facultad',
  styleUrls: ['./facultad.component.css'],
  templateUrl: './facultad.component.html',
  
})
export class FacultadComponent implements OnInit {
  facultades: Facultad[] = [];
  selectedFacultad: Facultad | null = null;

  constructor(private facultadService: FacultadService) { }

  ngOnInit(): void {
    this.getFacultades();
  }

  getFacultades(): void {
    this.facultadService.getFacultades().subscribe(facultades => this.facultades = facultades);
  }

  selectFacultad(facultad: Facultad): void {
    this.selectedFacultad = { ...facultad };
  }

  save(): void {
    if (this.selectedFacultad) {
      if (this.selectedFacultad.id) {
        this.facultadService.updateFacultad(this.selectedFacultad.id, this.selectedFacultad)
          .subscribe(() => {
            this.getFacultades();
            this.selectedFacultad = null;
          });
      } else {
        this.facultadService.createFacultad(this.selectedFacultad)
          .subscribe(() => {
            this.getFacultades();
            this.selectedFacultad = null;
          });
      }
    }
  }

  delete(facultad: Facultad): void {
    this.facultadService.deleteFacultad(facultad.id).subscribe(() => this.getFacultades());
  }

  addNew(): void {
    this.selectedFacultad = { id: 0, nombre: '' };
  }

  cancel(): void {
    this.selectedFacultad = null;
  }
}
