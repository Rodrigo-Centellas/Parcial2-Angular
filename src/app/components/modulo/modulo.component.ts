import { Component, OnInit } from '@angular/core';
import { ModuloService } from '../../services/modulo.service';
import { Modulo } from '../../models/modulo';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.css']
})
export class ModuloComponent implements OnInit {
  modulos: Modulo[] = [];
  selectedModulo: Modulo | null = null;

  constructor(private moduloService: ModuloService) { }

  ngOnInit(): void {
    this.getModulos();
  }

  getModulos(): void {
    this.moduloService.getModulos().subscribe(modulos => {
      this.modulos = modulos;
      console.log('Fetched modules:', this.modulos);  // Debug
    });
  }

  selectModulo(modulo: Modulo): void {
    this.selectedModulo = { ...modulo };
    console.log('Selected module:', this.selectedModulo);  // Debug
  }

  save(): void {
    if (this.selectedModulo) {
      console.log('Saving module:', this.selectedModulo);  // Debug
      if (this.selectedModulo.id) {
        this.moduloService.updateModulo(this.selectedModulo.id, this.selectedModulo)
          .subscribe(response => {
            console.log('Updated module response:', response);  // Debug
            this.getModulos();
            this.selectedModulo = null;
          }, error => {
            console.error('Update error:', error);  // Debug
          });
      } else {
        this.moduloService.createModulo(this.selectedModulo)
          .subscribe(response => {
            console.log('Created module response:', response);  // Debug
            this.getModulos();
            this.selectedModulo = null;
          }, error => {
            console.error('Create error:', error);  // Debug
          });
      }
    }
  }

  delete(modulo: Modulo): void {
    console.log('Deleting module:', modulo);  // Debug
    this.moduloService.deleteModulo(modulo.id).subscribe(() => {
      this.getModulos();
    }, error => {
      console.error('Delete error:', error);  // Debug
    });
  }

  addNew(): void {
    this.selectedModulo = { id: 0, nombre: '' };
    console.log('Adding new module');  // Debug
  }

  cancel(): void {
    this.selectedModulo = null;
    console.log('Cancel');  // Debug
  }
}
