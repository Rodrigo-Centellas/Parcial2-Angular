// src/app/components/licencia/licencia.component.ts
import { Component, OnInit } from '@angular/core';
import { LicenciaService } from '../../services/licencia.service';
import { Licencia } from '../../models/licencia';

@Component({
  selector: 'app-licencia',
  templateUrl: './licencia.component.html',
  // styleUrls: ['./licencia.component.css']
})
export class LicenciaComponent implements OnInit {
  licencias: Licencia[] = [];
  selectedLicencia: Licencia | null = null;

  constructor(private licenciaService: LicenciaService) {}

  ngOnInit(): void {
    this.getLicencias();
  }

  getLicencias(): void {
    this.licenciaService.getLicencias().subscribe(licencias => this.licencias = licencias);
  }

  selectLicencia(licencia: Licencia): void {
    this.selectedLicencia = { ...licencia };
  }

  updateLicenciaStatus(status: string): void {
    if (this.selectedLicencia) {
      this.selectedLicencia.estado = status;
      this.licenciaService.updateLicencia(this.selectedLicencia.id, this.selectedLicencia)
        .subscribe(() => {
          this.getLicencias();
          this.selectedLicencia = null;
        });
    }
  }

  cancel(): void {
    this.selectedLicencia = null;
  }
}
