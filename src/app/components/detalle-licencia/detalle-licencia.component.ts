// src/app/components/detalle-licencia/detalle-licencia.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LicenciaService } from '../../services/licencia.service';
import { Licencia } from '../../models/licencia';

@Component({
  selector: 'app-detalle-licencia',
  templateUrl: './detalle-licencia.component.html',
  styleUrls: ['./detalle-licencia.component.css']
})
export class DetalleLicenciaComponent implements OnInit {
  licencia: Licencia | undefined;

  constructor(
    private route: ActivatedRoute,
    private licenciaService: LicenciaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getLicencia(+id);
    }
  }

  getLicencia(id: number): void {
    this.licenciaService.getLicencias().subscribe((licencias) => {
      this.licencia = licencias.find((licencia) => licencia.id === id);
    });
  }

  updateLicenciaStatus(status: string): void {
    if (this.licencia) {
      if (status === 'aprobada') {
        this.licenciaService.approveLicencia(this.licencia.id).subscribe(() => {
          this.licencia!.estado = 'aprobada';
        });
      } else if (status === 'rechazada') {
        this.licenciaService.rejectLicencia(this.licencia.id).subscribe(() => {
          this.licencia!.estado = 'rechazada';
        });
      }
    }
  }

  
}
